import wepy from 'wepy'
import 'wepy-async-function'
import { BASIC_REQUEST_URL , LOGIN_REQUEST_URL, REGISTER_REQUEST_URL, REGISTER_GETVCODE_REQUEST_URL} from '../utils/constant'
import json2Form from'../utils/utils'

// 只有post请求的时候才加这个header
const POST_CONTENT_TYPE = 'application/x-www-form-urlencoded'

const login = async (email, password, type) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + LOGIN_REQUEST_URL,
    data: {
      email: email,
      password: password,
      type: type
    },
    method: 'POST',
    header: {
      'content-type': POST_CONTENT_TYPE
    },
  })
  if (res.statusCode === 200) {
    console.log(res.data)
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
      name: name,
      validate_code: vcode
    },
    method: 'POST',
    header: {
      'content-type': POST_CONTENT_TYPE
    },
  })
  if (res.statusCode === 200) {
    console.log(res.data)
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
      'content-type': POST_CONTENT_TYPE
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
