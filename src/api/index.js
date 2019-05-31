import wepy from 'wepy'
import 'wepy-async-function'
import { BASIC_REQUEST_URL } from '../utils/constant'
import json2Form from'../utils/utils'

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

const register = async (registerInfo) => {
  let res = await  wepy.request({
    url: BASIC_REQUEST_URL + '/user/register',
    data: {
      email: registerInfo.email,
      password: registerInfo.password,
      student_id: registerInfo.student_id,
      sex: registerInfo.sex,
      collage: registerInfo.major,
      grade: registerInfo.grade,
      edu_bg: registerInfo.name,
      validate_code: registerInfo.vcode
    },
    method: 'POST'
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

const registerVcode = async(email) => {
  let res = await wepy.request({
    url: 'http://47.107.99.233:5000/user/get_verification_code/', //获取验证码开发者服务器接口地址",
    data: {
      email: email
    }, //请求的参数",
    method: 'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
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
