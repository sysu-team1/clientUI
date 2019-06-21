import wepy from 'wepy'
import 'wepy-async-function'

import {
  login,
  register,
  registerVcode,
  getInfo,
  editUserInfo,
  getOnGingTask,
  getFinishedTask,
  getCompleteTask,
  getNewPublish,
  getOngingPublish,
  getFinishedPulish,
  addCash,
  getPoint
} from './user'

import {
  searchTaskByPulisherId,
  searchTaskByAccepterId,
  searchTaskByTag,
  searchTaskByText,
  searchTaskByTaskID,
  acceptTask,
  publishTask,
  homePageRefresh,
  uploadImage,
  finishTask,
  getProblem,
  postAnswer,
  getAnswer
} from './task'



export {
  login,
  register,
  registerVcode,
  getInfo,
  editUserInfo,
  getOnGingTask,
  getFinishedTask,
  getCompleteTask,
  getNewPublish,
  getOngingPublish,
  getFinishedPulish,
  searchTaskByPulisherId,
  searchTaskByAccepterId,
  searchTaskByTag,
  searchTaskByText,
  searchTaskByTaskID,
  acceptTask,
  publishTask,
  homePageRefresh,
  uploadImage,
  finishTask,
  addCash,
  getProblem,
  getPoint,
  postAnswer,
  getAnswer
}
