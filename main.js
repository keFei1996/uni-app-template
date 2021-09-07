import Vue from 'vue'
import App from './App'
import {router, RouterMount} from './router/router.js'  //路径换成自己的
Vue.use(router)
import store from './store'
import fun from './utils/fun'
Vue.use(fun)

import dayjs from "dayjs"
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言
Vue.prototype.$dayjs = dayjs;// 赋值使用

App.mpType = 'app'


const app = new Vue({
    ...App,
    store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
