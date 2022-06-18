export function deepObjectMerge(defaultObj, obj) {
  // 深度合并对象
  for (let key in obj) {
    defaultObj[key] =
      defaultObj[key] && typeof defaultObj[key] === 'object'
        ? deepObjectMerge(defaultObj[key], obj[key])
        : obj[key];
  }
  return defaultObj;
};
