import wepy from 'wepy'
import 'wepy-async-function'
import {
  BASIC_REQUEST_URL ,
  ACCEPT_TASK_URL,
  FINISH_TASK_URL,
  CONTENT_TYPE,
  POST_CONTENT_TYPE
} from '../utils/constant'

const searchTask = async (params) => {
  console.log(params)
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/tasks/search/',
    data: params,
    method: 'GET'
  })

  if (res.statusCode === 200) {
    return res.data
  }
}

/**
 * 首页刷新与下拉加载，传入lastid，第一次请求lastid为-1
 * @param {String} lastId 上一次请求数据最后一数据的id，必选
 */
const homePageRefresh = async (lastId) => {
  let params = { last_id: lastId }
  return searchTask(params)
}


/**
 * 查询某个发布者发布的任务
 * @param {String} publisherId 发布者id
 * @param {String} Status 状态(all ongoing finished)
 * @param {String} lastId 上次请求的数据最后一条数据的id,必须
 */

const searchTaskByPulisherId = async (publisherId, Status, lastId) => {
  let params = {
    publisher_id: publisherId,
    status: Status,
    last_id: lastId
  }
  return searchTask(params)
}


/**
 * 查询自己接受的任务
 * @param {String} accepterId 当前用户的id
 * @param {String} Status 状态(all ongoing finished complete)
 * @param {String} lastAcceptTime 最后一次接受的时间
 * @param {String} lastId 上次请求的数据最后一条数据的id
 */

const searchTaskByAccepterId = async (accepterId, Status, lastAcceptTime, lastId) => {
  let params = {
    accepter_id: accepterId,
    status: Status,
    last_accept_time: lastAcceptTime,
    last_id: lastId
  }
  return searchTask(params)
}

/**
 * 根据标签查询任务
 * @param {String} tag 任务标签
 * @param {*} lastId 必须
 */

const searchTaskByTag = async (tag, lastId) => {
  let params = {
    tag: tag,
    last_id: lastId
  }
  return searchTask(params)
}

/**
 * 根据内容搜索任务
 * @param {String} text 内容
 * @param {String} lastId 必须
 */

const searchTaskByText = async (text, lastId) => {
  let params = {
    text: text,
    last_id: lastId
  }
  return searchTask(params)
}

/**
 *
 * @param {Int} taskid
 */
const searchTaskByTaskID = async  (taskID) => {
  let params = { task_id: taskID }
  return searchTask(params)
}

/**
 * @param {Int} accepterId
 * @param {Int} taskID
 */
const acceptTask = async (accepterId, taskID) => {
  console.log(accepterId, taskID)
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + ACCEPT_TASK_URL, //开发者服务器接口地址",
    data: {
      accepter_id: accepterId,
      task_id: taskID
    }, //请求的参数",
    method: 'POST',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    },
  });
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  }
}

/**
 * 
 * @param {Number} task_id 
 * @param {Number} open_id
 */
const finishTask = async (taskID, openid) => {
  let res = wepy.request({
    url: BASIC_REQUEST_URL + FINISH_TASK_URL, //开发者服务器接口地址",
    data: {
      task_id: taskID,
      openid: openid
    }, //请求的参数",
    method: 'POST',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    },
  });
  if (res.statusCode === 200) {
    return JSON.parse(res.data.replace(/'/g, '"'))
  } 
}

/**
 * 发布问卷
 * @param {*} id
 * @param {*} quest_name
 * @param {*} questions
 * @param {*} deadline_date
 * @param {*} people_type
 * @param {*} paticipate_number
 */
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
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    }
  })
  if (res.statusCode === 200) {
    return res.data
  }
}


/*
任务的创建
	input：
        publish_id, 发布人id ，也就是open_id
        limit_time, ddl
        limit_num, 限制人数数量
        title, task标题
        content, 内容（如果tag为'w问卷'，则内容为问卷的内容）
        tag, 标签['问卷', '取快递', '其他']
        reward, 赏额
        problem_content， 当tag为问卷的时候才有，否则默认值为""， 使用^作为problem的切分，使用$作为题目与答案的切分，使用#作为答案的切分
	output：
	"error": 0/1,
		"data": {
			"msg": "余额不足/创建成功/没有图片上传/创建成功/图片上传失败",
	}
使用例子
  async test() {
      var result = await publishTask()
      console.log(result)
    }
测试样例
  id = 1000000
  limit_time = '2000-01-01 00:00:00'
  limit_num = 11
  title = '测试'
  content = '内容'
  tag = '问卷'
  reward = 8
  problem_content = 'p1$a#b#c#d^p2$a#b#c#d' => p1 : a , b, c, d ; p2: a, b, c, d
*/
const publishTask = async (id='', limit_time='', limit_num='', title='', content='', tag='', reward='', problem_content='') => {
  var _this = this
  wx.chooseImage({
    // 选择图片的最大数量
    // 详情可见链接：https://www.cnblogs.com/srgk/p/8989515.html
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths)
      wx.uploadFile({
        url: BASIC_REQUEST_URL + '/tasks/create/',
        filePath: tempFilePaths[0],
        name: 'photo',
        formData: {
          "openid": id,
          "limit_time": limit_time,
          "limit_num": limit_num,
          "title": title,
          "content": content,
          "tag": tag,
          "reward": reward,
          "problem_content": problem_content
        },
        success (res){
          var datas = JSON.parse(res.data.replace(/'/g, '"'))
          console.log(datas)
        }
      })
    }
  })
}

/**
 * 创建任务， 创建除问卷以外任务类型的任务
 * @param {String} openid
 * @param {String} tempFilePath
 * @param {String} limit_time
 * @param {Int} limit_num
 * @param {String} title
 * @param {String} content
 * @param {String} tag
 * @param {Int} reward
 * @param {String} problem_content
 */

const createOtherTask = async (openid, tempFilePath, limit_time, limit_num, title, content, tag, reward, problem_content='') => {
  wx.uploadFile({
    url: BASIC_REQUEST_URL + '/tasks/create/',
    filePath: tempFilePath, // 传入时已变成String, 而非Array
    name: 'photo',
    formData: {
      "openid": openid,
      "limit_time": limit_time,
      "limit_num": limit_num,
      "title": title,
      "content": content,
      "tag": tag,
      "reward": reward,
      "problem_content": problem_content
    },
    success (res){
      var datas = JSON.parse(res.data.replace(/'/g, '"'))
      console.log(datas)
    }
  })  
}

/**
 * 获取上传图片的url
 * @param {String} tempFilePath
 * @param {String} openid
 */
const uploadImage = async (tempFilePath, openid) => {
  wx.uploadFile({
    url: BASIC_REQUEST_URL + '/temp/upload/' + openid,
    filePath: tempFilePath,
    name: 'photo',
    success (res){
      console.log(res)
      var datas = JSON.parse(res.data.replace(/'/g, '"'))
      console.log(datas)
    }
  })
}
/**获取问卷
 * @param taskid
 */
const getProblem = async (taskid) => {
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/get_problem/' + taskid, //开发者服务器接口地址",
    data: {taskid},
    method: 'GET',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    }
  });
  if (res.statusCode === 200) {
    console.log(res.data)
    return JSON.parse(res.data.replace(/'/g, '"'))
  } 
}

const postAnswer = async (taskID, openid, answer) => {
  console.log(answer)
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/post_answer/', //开发者服务器接口地址",
    data: {
      task_id: taskID,
      openid: openid,
      answer: answer
    }, //请求的参数",
    method: 'POST',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    }
  });
  if (res.statusCode === 200) {
    console.log(res.data)
    return JSON.parse(res.data.replace(/'/g,'"'))
  }
}

const getAnswer = async (all, taskID, openid) => {
  console.log(all, taskID, openid)
  let res = await wepy.request({
    url: BASIC_REQUEST_URL + '/get_answer/', //开发者服务器接口地址",
    data: {
      all: all,
      task_id: taskID,
      openid: openid
    }, //请求的参数",
    method: 'GET',
    header: {
      [CONTENT_TYPE]: POST_CONTENT_TYPE
    }
  });
  if (res.statusCode === 200) {
    console.log(res.data)
    return JSON.parse(res.data.replace(/'/g,'"'))
  }  
}

export {
  searchTaskByPulisherId,
  searchTaskByAccepterId,
  searchTaskByTag,
  searchTaskByText,
  searchTaskByTaskID,
  acceptTask,
  publishTask,
  homePageRefresh,
  searchTask,
  uploadImage,
  finishTask,
  getProblem,
  postAnswer,
  getAnswer
}
