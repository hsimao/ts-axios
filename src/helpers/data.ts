import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 只處理轉換一般物件格式資料, 使用 isPlainObject 方法排除 FormData，ArrayBuffer 這些類型物件
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
