// 分辨object还是arr
export const getType = (item) => {
  const _toString = Object.prototype.toString;
  return _toString.call(item).replace(/\[object\s(.+)\]/, '$1').toLowerCase()
}

// 深拷贝方法
export function cloneObj(obj) {
  if(typeof obj !== 'object') {
    return obj
  }
  let newObj = obj instanceof Array ? [] : {};
  Object.keys(obj).forEach(key => {
    newObj[key] = cloneObj(obj[key])
  })
  return newObj
}

// 同步设置缓存
export const setStorageSync = (k, v) => uni.setStorageSync(k, typeof v === 'object' ? JSON.stringify(v) : v)

// 同步获取缓存
export const getStorageSync = (k) => {
  let storage = uni.getStorageSync(k)
  if(!storage) return undefined

  const type = typeof JSON.parse(storage)
  if (type === 'object') {
    return JSON.parse(storage)
  } else {
    return storage
  }
}

// 数组对象key-value转化
export function parseTypeName(arr, itemVal, value, label) {
  if (arguments.length === 4) {
    const result = arr.find(item => item[value] == itemVal)
    return result ? result[label] : ''
  } else if (arguments.length === 2) {
    return arr[itemVal]
  }
}

// 操作系统
export const appEnv = function() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
  if(isAndroid) {
    return 'android';
  }else if(isIOS) {
    return 'ios';
  }else{
    return '';
  }
}