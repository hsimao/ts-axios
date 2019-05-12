import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 發送請求之前 config 要先進行的處理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

// 將 url 轉成需要格式, 使用 helpers/util 內的 buildURL 方法
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 將發送請求的 data 參數，轉換為 json格式字串
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

export default axios
