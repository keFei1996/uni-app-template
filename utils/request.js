import Request from 'luch-request'
import store from "../store";

const http = new Request()

let timeDifference,
  isRefreshing = false, // 是否正在刷新的标记
  requests = [] // 重试队列，每一项将是一个待执行的函数形式

// 设置全局配置
http.setConfig((config) => { /* 设置全局配置 */
  // config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' /* 根域名不同 */
  return config
})

// 请求拦截器
http.interceptors.request.use((options) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
  return options
}, (config) => {
  return Promise.reject(config)
})

// 响应拦截器
http.interceptors.response.use(async response => { // 响应数据
  console.log(response)
  return response.data;
}, async (error) => { // 响应错误
  const options = error.config
  uni.hideLoading()
  let error_code
  const statusCode = error.statusCode // statusCode HTTP码
  let data = error.data
  if (data) {
    error_code = data.code || data.errorCode // error_code 后端定义码
  } else {
    return Promise.reject(error);
  }
  error_code ? showError(error_code, data) : showError(statusCode, data)
  if(statusCode === 401) {
    try{
      const tokens = getStorageSync('wx_tokens')
      if(!tokens) {
        await store.dispatch('login/exitLogin', 0)
        return Promise.reject('登录已失效');
      }
      if (data.errorCode === 40101) { // accessToken 失效
        if (!isRefreshing) {
          isRefreshing = true
          await store.dispatch('login/quickLogin')
          data = await http.request(options)
          requests.forEach(cb => cb())
          requests = []
          isRefreshing = false
          return data
        } else {
          return new Promise(resolve => {
            requests.push(() => {
              resolve(http.request(options))
            })
          })
        }
      } else if (data.errorCode === 40103) { // 微信登录凭证失效
        await store.dispatch('login/quickLogin')
        return await http.request(options)
      } else if (data.errorCode === 40104 || data.errorCode === 40105) { // 账号未绑定重新登录
        console.log('解绑被执行了')
        return await store.dispatch('login/exitLogin', 0)
      } else if (data.errorCode === 40100) { // 时间戳与服务器时间戳不符（授权码过期）
        timeDifference = Number(data.data.timestamp) - Date.now()
        return await http.request(options)
      }else {
        return await store.dispatch('login/exitLogin', 0)
      }
    }catch(e)  {
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
})

function showError(error_code, serverError) {
  let tip
  if (!error_code) {
    tip = statusMsg['-1']
  } else {
    if (statusMsg[error_code] === undefined) {
      tip = serverError.msg || serverError.message || '服务器发生错误，请检查服务器'
    } else {
      tip = statusMsg[error_code]
    }
  }
  uni.showToast({
    icon: 'none',
    mask: true,
    title: tip,
    duration: 2000
  })
}

export default http