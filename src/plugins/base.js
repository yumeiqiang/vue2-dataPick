/**
 * Created by joojia on 17/3/15.
 */
import {
  baseUrl
} from './env'
import axios from 'axios'
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
function config () {
  let user = JSON.parse(window.localStorage.getItem('user'))
  let token = 'Bearer '
  if (user && user.token) {
    token += user.token
  }
  return {
    headers: {
      'Authorization': token
    }
  }
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

