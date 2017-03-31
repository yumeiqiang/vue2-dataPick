/**
 * Created by joojia on 17/3/15.
 */
import {
  baseUrl
} from './env'
import axios from 'axios'
import store from '../store'
import router from '../router'
/**
 * promise请求
 * @param url 请求url
 * @param options 请求方法, 数据, url参数
 * @returns {Promise}
 */
export function httpReq (url, options = { method: 'get', data: {}, urlParams: {} }) {
  // 参数处理
  url=baseUrl+url;
  let p
  if (typeof options.urlParams !== 'undefined' && count(options.urlParams)) {
    p = deepCopy(config())
    p.params = options.urlParams
  } else {
    p = config()
  }
  // 方法
  if (typeof options.method === 'undefined') {
    options.method = 'get'
  }
  return Promise.race([_resolve(url, p, options), _timeout()])
}

function _resolve (url, p, options) {
  return new Promise((resolve, reject) => {
    switch (options.method) {
      case 'post':
        axios.post(url, options.data, p).then((response) => {
          resolve(response.data)
        }, (err) => {
          window.Raven.captureException(err)
          console.log(err)
        })
        break
      case 'put':
        axios.put(url, options.data, p).then((response) => {
          resolve(response.data)
        }, (err) => {
          window.Raven.captureException(err)
          console.log(err)
        })
        break
      case 'delete':
        axios.delete(url, p).then((response) => {
          resolve(response.data)
        }, (err) => {
          window.Raven.captureException(err)
          console.log(err)
        })
        break
      case 'get':
        axios.get(url, p).then((response) => {
          resolve(response.data)
        }, (err) => {
          window.Raven.captureException(err)
          console.log(err)
        })
        break
    }
  })
}


function config() {
  // http request 拦截器
  axios.interceptors.request.use(
    config => {
      if (store.state.Auth.token) {
        config.headers.Authorization = `token ${store.state.Auth.token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });
  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 4004:
            // 4004 清除token信息并跳转到登录页面
            store.commit('LOGIN');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
    });
}
export const conf = config()
/**
 * 对象深拷贝
 * @param source
 * @returns {{}}
 */
function deepCopy (source) {
  var result = {}
  for (var key in source) {
    result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
  }
  return result
}
/**
 * 判断对象长度
 * @param obj
 * @returns {*}
 */
function count (obj) {
  let objType = typeof obj
  if (objType === 'string') {
    return obj.length
  } else if (objType === 'object') {
    let objLen = 0
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) objLen++
    }
    return objLen
  }
  return false
}

// 设置请求超过15秒超时
function _timeout () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, 15000)
  })
}

/**
 * config
 */
// function config () {
//   let token = 'Bearer '
//   if (store.state.Auth.token) {
//     token += store.state.token
//   }
//   return {
//     headers: {
//       'Authorization': token
//     }
//   }
// }
//
// export const conf = config()
