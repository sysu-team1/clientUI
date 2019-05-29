import wepy from 'wepy'
import 'wepy-async-function'

import { BASIC_REQUEST_URL } from '../utils/constant'

export const register = (data) => {
  return wepy.request({
    url: BASIC_REQUEST_URL + '',
    data
  }).then(res => {

  })
}
