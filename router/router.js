// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
});

const whiteList = [
  '/pages/login/login',
]
//全局路由前置守卫
router.beforeEach(async(to, from, next) => {

  if(whiteList.includes(to.path)) {
    next();
    return
  }

  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束')
})

export {
  router,
  RouterMount
}