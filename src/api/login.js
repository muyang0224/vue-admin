import service from "../utils/request.js";

/**
 * 获取验证码
 */
export function GetSms(data) {
 return service.request({
    method: "post",
    url: "/getSms/",
    data:data,
  });
}

/**
 * 获取用户角色
 */


/**
 * 登录
 */
export function getLogin(data){
  return service.request({
    method:"post",
    url:"/login/",
    data,
  });
}

/**
 * 注册
 */
export function getReg(data){
  return service.request({
    method:"post",
    url:"/register/",
    data
  });

}