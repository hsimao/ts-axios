import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 只處理轉換一般物件格式資料, 使用 isPlainObject 方法排除 FormData，ArrayBuffer 這些類型物件
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 解析回應的資料, 將字串轉換成物件格式
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
