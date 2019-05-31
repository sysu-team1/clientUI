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

const register = async ({email, password}) => {
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

export {
  login,
  register
}
