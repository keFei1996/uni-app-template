import {router} from "../router/router";
import {setStorageSync, getStorageSync, parseTypeName, appEnv} from "./common";

export default {
  install (Vue) {
    Vue.prototype.$showToast = (title, icon='none') => {
      uni.showToast({
        title,
        icon,
        duration: 2000
      });
    }
    Vue.prototype.$parseTypeName = parseTypeName
    // 路由跳转
    Vue.prototype.$toRouter = function(path, query={}) {
      if (!path) return;
      router.push({
        path,
        query
      })
    };
    // 路由跳转-replace
    Vue.prototype.$toReplace = function(path, query={}) {
      if (!path) return;
      router.replace({
        path,
        query
      })
    };
    // 路由跳转-replace
    Vue.prototype.$toReplaceAll = function(path, query={}) {
      if (!path) return;
      router.replaceAll({
        path,
        query
      })
    };
    // 页面跳转
    Vue.prototype.$toHref = function(url) {
      window.location.href = url;
    };
    // 返回上一页
    Vue.prototype.$goBack = function() {
      router.back(1);
    };
    Vue.prototype.$setStorageSync = setStorageSync;
    Vue.prototype.$getStorageSync = getStorageSync;
  }
}