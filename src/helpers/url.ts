import { isDate, isPlainObject } from './util'

// encode 特殊字符支持方法
// 對於字符 @、:、$、,、、[、]，允許出現在 url 中的，不要被 encode，且需把空格 轉換成 +
// 接收參數 params: { foo: '@:$, ' }
// 預計轉換 ?foo=@:$+
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@') // 將被 encode 的 @ 恢復
    .replace(/%3A/gi, ':') // 將被 encode 的 : 恢復
    .replace(/%24/g, '$') // 將被 encode 的 $ 恢復
    .replace(/%2C/gi, ',') // 將被 encode 的 , 恢復
    .replace(/%5B/gi, '[') // 將被 encode 的 [ 恢復
    .replace(/%5D/gi, ']') // 將被 encode 的 ] 恢復
    .replace(/%20/g, '+') // 空格 變成 +
}

/* buildURL 需求
1.) 可接收 params 為陣列、物件、date格式
2.) 可接收特殊符號 @、:、$、,、、[、]，
3.) 空格需轉換為 + 號
4.) 移除 url 參數中的 #hash
5.) 保留 url 中已存在的參數

== params 為物件的轉換範例
params: {
  a: 1,
  b: 2
}
轉換 ?a=1&b=2

== params 為陣列的轉換範例
params: {
  foo: ['bar', 'baz']
}
轉換 ?foo[]=bar&foo[]=baz'

*/

export function buildURL(url: string, params?: any): string {
  if (!params) return url

  // format params
  // parts 只能接收內容為字串的陣列
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    // 值為空則返回
    if (val === null || typeof val === 'undefined') return

    let values = []
    // 陣列處理
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 物件處理
      values = [val]
    }

    // 日期格式處理
    // 使用toISOString轉換 ?date=2019-04-01T05:55:39.030Z
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // key 跟 val 使用 encode 轉換並組合
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 將陣列串聯成一組字串並加上 &
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // url 拼接 params 處理
    // 將有 url 參數內有 # hash 的值刪除
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判斷 url 參數是否已經有 ? 沒有的話就加上，否則就加上 &
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
