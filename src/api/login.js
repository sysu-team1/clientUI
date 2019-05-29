import wepy from 'wepy'
import 'wepy-async-function'
import { BASIC_REQUEST_URL } from '../utils/constant'

export const login =  (email, password) => {
  return wepy.request({
    url: BASIC_REQUEST_URL + '',
    data: {
      email,
      password
    }
  }).then(res => {
    return res
  })
}


