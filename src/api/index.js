import wepy from 'wepy'
import 'wepy-async-function'
import { BASIC_REQUEST_URL } from '../utils/constant'

const login = async (email, password) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '',
    data: {
      email,
      password
    },
    method: 'POST'
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

const register = async (email, password) => {
  let res = await  wepy.request({
    url: BASIC_REQUEST_URL + '',
    data: {
      email,
      password
    },
    method: 'POST'
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

const registerVcode = async(email) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/user/get_verification_code/', //获取验证码开发者服务器接口地址",
    data: {
      email: email
    }, //请求的参数",
    method: 'POST',
    // dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'chartset': 'utf-8'
    }
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

const getPoint = async (id) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '',
    data: {
      id
    }
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

export {
  login,
  register,
  registerVcode
}
