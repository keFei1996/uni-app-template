import { isTypeOf } from "./typePub";
import { fileUpload } from "../services/file";

// 图片的字节大小数组
let tempFiles = [];

const compressImage = function(fileObj) {
  return new Promise((resolve, reject) => {
    let quality = 0.9;
    const sizeRatio = parseInt(fileObj.size/Math.pow(1024, 2))
    if(sizeRatio < 1) {
      quality = 0.8
    }else {
      quality = 0.1
    }
    const img = new Image();
    img.src = fileObj.path;
    img.onload = function() {
      console.log('img', img.width)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')
      const canvasWidth = img.width // 图片原始长宽
      const canvasHeight = img.height
      fileObj.width = canvasWidth
      fileObj.height = canvasHeight
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality); //图片格式jpeg或webp可以选0-1质量区间
      // 返回base64转blob的值
      console.log(`原图${(fileObj.size/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
      fileObj.base64 = base64;
      resolve(base64);
    }
    img.onerror = function (err) {
      console.log('图片压缩报错', err)
      reject(err)
    }
  })
}



// 图片队列
function imgQueue(urls) {
  let promise = Promise.resolve([]);
  urls.forEach((url, i) => {
    promise = promise.then((arr) => {
      return uploadFile(arr, url, tempFiles[i].size)
    })
  })
  return promise
}

// 图片上传
function uploadFile(arr = [], url, size) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: url,
      success: async (image) => {
        image.size = size;
        uni.showLoading({
          title: '图片上传中……'
        });
        console.log('image', image)
        fileUpload({
          filePath: image.path || image.base64
        }).then(res => {
          console.log('data', res)
          // id值可能为报错信息
          if (isTypeOf(res, 'string')) {
            const obj = {
              id: res,
              width: image.width,
              height: image.height,
              url: image.path,
              size: size,
              type: image.type
            };
            arr.push(obj);
            resolve(arr);
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  })
}

class UpImg {
  // 单张或者多张图片上传
  static chooseImage (config = {}) {
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count: config.count || 1,
        sizeType: config.sizeType || ['compressed'], // 压缩图
        sourceType: config.sourceType ? [config.sourceType] : ['album', 'camera'],
        success: res => {
          // 记录图片大小数组
          tempFiles = res.tempFiles;
          // url数组
          const tempFilePaths = res.tempFilePaths;
          uni.showLoading({
            title: '图片上传中……'
          })
          // 通过图片队列实现批量上传
          imgQueue(tempFilePaths).then(res => {
            uni.hideLoading();
            resolve(res);
            // if(config.count && config.count > 1) {
            //   resolve(res);
            // } else {
            //   resolve(res[0] || {});
            // }
          })
            .catch(err => {
              uni.hideLoading();
              console.log('图片上传失败', err);
              uni.showToast({
                title: '图片上传失败',
                icon: 'none',
                duration: 2000
              })
            })
        },
        fail: (error) => {
          console.log('图片上传报错', error);
          reject(error)
          // #ifdef MP
          // uni.getSetting({
          //   success: res => {
          //     const authStatus = res.authSetting['scope.album']
          //     if (!authStatus) {
          //       uni.showModal({
          //         title: '授权失败',
          //         content: '需要从您的相册获取图片，请在设置界面打开相关权限',
          //         success: res => {
          //           if (res.confirm) {
          //             uni.openSetting()
          //           }
          //         }
          //       })
          //     }
          //   }
          // })
          // #endif
        }
      })
    })
  }
}

export default UpImg
