
//过滤特殊字符
export function stripscript(str){
    var pattern =new RegExp("[`~!@#$%^&*()+=| {}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]")
      var rs="";
    for(var i=0;i<str.length;i++){
    rs=rs+str.substr(i,1).replace(pattern,"");
    }
    return rs;
    }

//验证邮箱
export function verifyEmail(value){
  var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(value)? true : false
}

//验证密码
export function verifyPassword(value){
  var reg=/^[a-z0-9A-z]{6,16}$/;
  return reg.test(value)?true:false
}

//验证验证码
export function verifyClod(value){
  var reg=/^[0-9a-zA-Z]{6}$/;
  return reg.test(value)?true:false
}