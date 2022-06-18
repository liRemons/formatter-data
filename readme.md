#### `formatter-data`

一个用来格式化数据的工具

#### 使用

```bash
npm i formatter-data
```

#### 页面中引入

```javascript
import { formatter } from 'formatter-data'
```

#### API

在此提供了3种格式化函数的方法

分别是`object`,`list`,`treeList`

##### `object`

解析映射

```js
formatter('object',
{
  data: 'record.data',
  code: 'errorCode',
  pageNum: 'pageInfo.pageNum',
  'pagination.pageInfos.current': 'pageInfo.pageIndex',
  'pagination.pageInfos.pageSize': 'pageInfo.pageNum',
  'pagination.pageInfos.total': 'pageInfo.total',
})(data);
// record.data => data
// errorCode => code
// pageInfo: { pageNum } => pageNum
// =================================
// pageInfo: { pageIndex }
// pageInfo: { pageNum }
// pageInfo: { total } 
// => pagination: { pageInfos: { pageIndex, pageNum, total } }
```

##### `list`

解析映射，但 `rule` 为一个数组

rule: [映射的`data`，对`data`数组进行处理的规则]

注意：`rule[0]`中必须为 `data`

```js
formatter('list', [
  {
    data: 'record.data',
    'code.errorCode': 'errorCode'
  },
  { label: 'name', a: 'value' }
])(data)
// record.data => data
// errorCode => code: { errorCode }
// record.data[0].name => record.data[0].label
// record.data[0].value => record.data[0].a
```

##### `treeList`

和 `list`相同，但可以解析 `children`

```javascript
formatter('treeList', [
  { 
     data: 'record.data',
  	'code.errorCode': 'errorCode'
  },
  { labels: 'name', values: 'value', children: 'children' }
])(data);
// record.data => data
// errorCode => code: { errorCode }
// record.data[0].name => record.data[0].label
// record.data[0].value => record.data[0].values
// children: 和 data 一样进行递归处理
```