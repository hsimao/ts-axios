const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判斷是否為普通的物件格式
// 排除對於 FormData，ArrayBuffer 這些類型物件
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
