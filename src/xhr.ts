import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 設置 headers
  Object.keys(headers).forEach(name => {
    // 判斷如果沒有 data, 就不需設置 headers 的 content-type, 直接刪除
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
