import wepy from 'wepy'
import 'wepy-async-function'
import { BASIC_REQUEST_URL , REGISTER_REQUEST_URL, REGISTER_GETVCODE_REQUEST_URL} from '../utils/constant'
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
const register = async (email, vcode, password, name, studentId, major, grade, sex) => {
  let res = await  wepy.request({
    url: BASIC_REQUEST_URL + REGISTER_REQUEST_URL,
    data: {
      email: email,
      password: password,
      student_id: studentId,
      sex: sex,
      collage: major,
      grade: grade,
      edu_bg: name,
      validate_code: vcode
    },
    method: 'POST'
  })
  if (res.statusCode === 200) {
    return res.data
  }
}

const registerVcode = async(email) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + REGISTER_GETVCODE_REQUEST_URL, // 获取验证码开发者服务器接口地址
    data: {
      email: email
    }, //请求的参数",
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
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
