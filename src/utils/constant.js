/*
 * 用户搜索历史字段
 */

export const USER_SEARCH_HISTORY = "userSearchHistory";

/*
 * 用户微信信息字段
 * 用户昵称，用户头像，用户性别，用户地址
 */
export const USER_WEIXIN_INFO = "userWexinInfo";

/*
 * 用户注册登录信息字段
 * 用户邮箱，用户密码，年级，专业，学号
 */
export const USER_LOGIN_INFO = "userLoginInfo";

export const USER_DETAIL_INFO = 'USER_DETAIL_INFO'
/**
 * API URL前缀
 */
// export const BASIC_REQUEST_URL = 'http://127.0.0.1:5000'
export const BASIC_REQUEST_URL = 'http://47.107.99.233:5000'

/**
 * API URL后缀
 */
export const REGISTER_REQUEST_URL = '/user/register/'
export const REGISTER_GETVCODE_REQUEST_URL = '/user/get_verification_code/'
export const LOGIN_REQUEST_URL = '/user/login/'
export const ACCEPT_TASK_URL = '/tasks/accept/'


// Header
export const POST_CONTENT_TYPE = 'application/x-www-form-urlencoded'
export const CONTENT_TYPE = 'content-type'
