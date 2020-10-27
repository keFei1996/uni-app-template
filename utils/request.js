import Request from 'luch-request'

const http = new Request()

// 设置全局配置
http.setConfig((config) => { /* 设置全局配置 */
  // config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' /* 根域名不同 */
  return config
})

// 请求拦截器
http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
  return config
}, (config) => {
  return Promise.reject(config)
})

// 响应拦截器
http.interceptors.response.use(async response => { // 响应数据
  console.log(response)
  return response.data;
}, async (error) => { // 响应错误
  console.log('err', error) // for debug
  uni.showToast({
    title: error.message,
    mask: true,
    icon: 'fail',
    duration: 2000
  });
  return Promise.reject(error);
})

export default http