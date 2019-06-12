import { isPlainObject } from './util'

// headers 參數名稱統一規範方法
// 因 headers 的屬性參數名稱大小寫都可接收，因此需要統一規範處理, 以便於後續判斷
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    // 全部轉成大寫來判斷, 如果符合，就將原本的值, 搬移到對應的規範命名屬性內
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// headers 設置處理, 依據 data 屬性來判斷設置不同 Content-Type
export function processHeaders(headers: any, data: any): any {
  // headers 參數命名統一處理
  normalizeHeaderName(headers, 'Content-Type')

  // 如果是普通物件格式, 且沒有另外設置 Content-Type, 就預設為 application/json;charset=utf-8
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 解析回應的 headers 資料, 將原始字串解析成物件格式
/* 原始取得資料如下
  date: Fri, 05 Apr 2019 12:40:49 GMT
  etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
  connection: keep-alive
  x-powered-by: Express
  content-length: 13
  content-type: application/json; charset=utf-8
*/
/* 解析成以下物件格式
  {
    date: 'Fri, 05 Apr 2019 12:40:49 GMT'
    etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
    connection: 'keep-alive',
    'x-powered-by': 'Express',
    'content-length': '13'
    'content-type': 'application/json; charset=utf-8'
  }
*/
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}
