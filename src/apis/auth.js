import request from '@/utils/request';


/**
 * 密码登录
 */
export function passwordLogin() {

}
/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get('/user/getInfo');
}
