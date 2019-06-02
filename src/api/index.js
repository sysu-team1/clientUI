import wepy from 'wepy'
import 'wepy-async-function'
import {
  BASIC_REQUEST_URL ,
  LOGIN_REQUEST_URL,
  REGISTER_REQUEST_URL,
  REGISTER_GETVCODE_REQUEST_URL
} from '../utils/constant'
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
  // 返回信息
  // error： 1表示出错， 0表示正常
  // error_message:
  //     '密码错误'
  //     '账号不存在'
  // data:
  //   openid: 账号的唯一id
  //
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

const registerVcode = async(email) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + REGISTER_GETVCODE_REQUEST_URL, // 获取验证码开发者服务器接口地址
    data: {
      email: email
    },
    method: 'POST',
    header: {
      'content-type': POST_CONTENT_TYPE
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

const getPoint = async (id) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '',
    data: {
      id
    }
  })
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  }
}


const searchTask = async (params) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/task/search',
    data: params,
    method: 'GET'
  })

  if (res.statusCode === 200) {
    return res.data
  }
}


/**
 * 查询某个发布者发布的任务
 * @param {String} publisherId 发布者id
 * @param {String} lastId 上次请求的数据最后一条数据的id, 可选
 */

const searchTaskByPulisherId = async (publisherId, lastId) => {
  let params = { publisher_id: publisherId }
  if (lastId) {
    params.last_id = lastId
  }
  return searchTask(params)
}


/**
 * 查询自己接受的任务
 * @param {String} accepterId 当前用户的id
 * @param {String} lastId 上次请求的数据最后一条数据的id 可选
 */

const searchTaskByAccepterId = async (accepterId, lastId) => {
  let params = { accepter_id: accepterId }
  if (lastId) {
    params.last_id = lastId
  }
  return searchTask(params)
}

/**
 * 根据标签查询任务
 * @param {String} tag 任务标签
 * @param {*} lastId
 */

const searchTaskByTag = async (tag, lastId) => {
  let params = { tag }
  if (lastId) {
    params.last_id = lastId
  }
  return searchTask(params)
}

/**
 * 根据内容搜索任务
 * @param {String} text 内容
 * @param {String} lastId 可选
 */

const searchTaskByText = async (text, lastId) => {
  let params = { text }
  if (lastId) {
    params.last_id = lastId
  }
  return searchTask(params)
}

// 发问卷
const publishQuestionPaper = async (id, quest_name, questions, deadline_date, people_type, paticipate_number) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/user/questpaper',
    method: 'POST',
    data: {
      id,
      quest_name,
      questions,
      deadline_date,
      people_type,
      paticipate_number
    },
    header: {
      'content-type': POST_CONTENT_TYPE
    }
  })
  if (res.statusCode === 200) {
    return res.data
  }
}


//

export {
  login,
  register,
  registerVcode,
  getPoints,
  searchTaskByPulisherId,
  searchTaskByAccepterId,
  searchTaskByTag,
  searchTaskByText
}
