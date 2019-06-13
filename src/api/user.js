import wepy from 'wepy'
import 'wepy-async-function'
import {
  BASIC_REQUEST_URL ,
  LOGIN_REQUEST_URL,
  REGISTER_REQUEST_URL,
  REGISTER_GETVCODE_REQUEST_URL,
  CONTENT_TYPE,
  POST_CONTENT_TYPE
} from '../utils/constant'

/**
 * 用户登录功能
 * @param {String} email 登录邮箱
 * @param {String} password 登录密码
 * @param {String} type 类型 学生|组织
 */
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
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    },
  })
  // 返回信息
  // error： 1表示出错， 0表示正常
  // error_message:
  //     '密码错误'
  //     '账号不存在'
  // data:
  //   openid: 账号的唯一id
  //
  if (res.statusCode === 200) {
    return res.data
  }
}

/**
 * 用户注册
 * @param {String} email 邮箱
 * @param {String} vcode 验证码
 * @param {String} password 密码
 * @param {String} name 昵称
 * @param {String} studentId 学号
 * @param {String} major 专业
 * @param {Number} grade 年级
 * @param {String} sex 性别
 */

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
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    },
  })
  // 返回信息
  // error： 1表示出错， 0表示正常
  // error_message:
  //     '未获取验证码或验证码过期'
  //     '验证码错误'
  //     '已经存在'
  //     ''         表示注册成功
  // data:
  //   openid: 账号的唯一id
  //
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  }
}

/**
 * 获取验证码
 * @param {String} email 邮箱
 */
const registerVcode = async(email) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + REGISTER_GETVCODE_REQUEST_URL, // 获取验证码开发者服务器接口地址
    data: {
      email: email
    },
    method: 'POST',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    },
  })
  // 返回信息
  // error： 1表示出错， 0表示正常
  // error_message:
  //     '原验证码未过期'
  //     '验证码已发送'
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  }
}

/**
 * 获取用户详细信息
 * @param {String|Number} openid 用户openid
 */

const getInfo = async (openid) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/my/' + String(openid), // 获取验证码开发者服务器接口地址
    method: 'GET',
  })
  // 学生：返回['email', 'student_id', 'name', 'sex', 'collage', 'grade', 'edu_bg', 'cash']
  // 组织：返回['email', 'name', 'cash']
  if (res.statusCode === 200) {
    return res.data
  }
}

/**
 * 更新用户信息
 * @param {Object} params 更新的字段
 */
const editUserInfo = async (params)  => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/user/update/',
    method: 'POST',
    data: params,
    header: {
      'content-type': POST_CONTENT_TYPE
    },
    dataType: 'json'
  })
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  }
}



export {
  login,
  register,
  registerVcode,
  getInfo,
  editUserInfo
}
