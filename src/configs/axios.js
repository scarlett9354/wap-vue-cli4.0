import axios from 'axios'
import { ERROR } from '@/constants/responseCode'

const promiseMap = {}
let cancel = null
const CancelToken = axios.CancelToken

if(process.env.NODE_ENV !== 'development') {
  const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
  axios.defaults.baseURL = VUE_APP_BASE_URL
}

axios.interceptors.request.use(
  config => {
    promiseMap[config.url] = cancel
    if(config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      config.params._ = new Date().getTime()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.code === ERROR) {
      // Toast.fail(response.data.message, 2)
    }
    return response
  },
  error => {
    if (axios.isCancel(error)) {} else {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // Toast.fail('请求超时', 2)
      } else if (error && error.response) {
        if(error.response.status === 401) {
          // 返回到登录页，待补充※
        }else {
          let str = '网络不给力哦，请检查网络状态'
          switch (error.response.status) {
            case 404:
              str = '访问地址不存在'
              break
            case 500:
              str = '访问地址出现异常'
              break
            case 502:
            case 504:
              str = '服务器不在服务区'
              break
            default:
              break
          }
          console.log(str)
          // Toast.fail(str, 2)
        }
      } else {
        // Toast.fail('出现网络错误,请重试', 2)
      }
    }
    return Promise.resolve({ data: { code: '-1' } })
  }
)

// 默认导出这个对象
export default {
  get (url, params, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  },
  post (url, data, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  }
}
