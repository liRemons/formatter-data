import { deepObjectMerge } from './utils'

export function formatterObject(rule, data) {
  let newData = {}
  for (const key in rule) {
    const values = rule[key].split('.')
    let formatterData = data
    values.forEach((el) => {
      formatterData = formatterData[el]
    })
    const keys = key.split('.')
    if (keys.length === 1) {
      newData[key] = formatterData
    } else {
      const reduceData = keys.reduceRight((v, item, index) => {
        return { [item]: index === keys.length - 1 ? formatterData : v }
      }, {})
      newData = deepObjectMerge(newData, reduceData)
    }
  }
  return newData
}

export function formatterList(rule, data) {
  const [ruleMap, ruleMapValues] = rule
  const newData = formatterObject(ruleMap, data)
  if (ruleMapValues) {
    newData.data = newData.data.map((item) =>
      formatterObject(ruleMapValues, item)
    )
  }

  return newData
}

export function formatterTreeList(rule, data) {
  const [ruleMap, ruleMapValues] = rule
  const newData = formatterObject(ruleMap, data)
  function deepData(handleData) {
    return handleData.map((item) => {
      let obj = {}
      for (const key in ruleMapValues) {
        if (key === 'children') {
          obj = {
            ...formatterObject(ruleMapValues, item),
            children: deepData(item[ruleMapValues[key]] || []),
          }
          return obj
        } else {
          obj = formatterObject(ruleMapValues, item)
        }
      }
      return obj
    })
  }
  if (ruleMapValues) {
    newData.data = deepData(newData.data)
  }
  return newData
}

export const formatter = (type, rule) => (data) => {
  const typeOption = {
    object: formatterObject,
    list: formatterList,
    treeList: formatterTreeList,
  }
  return typeOption[type](rule, data)
}
