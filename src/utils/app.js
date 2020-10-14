import cookie from "js-cookie";

const adminToKen="admin_toKen";
const usernameKey="username";

export function getToKen(){
    return cookie.get(adminToKen);
}

export function setToKen(token){
    return cookie.set(adminToKen,token);
}

export function removeToKen(token){
    return cookie.remove(adminToKen)
}
export function removeUserName(){
    return cookie.remove(usernameKey)
}

export function setUserName(value){
    return cookie.set(usernameKey,value)
}
export function getUsername(){
    return cookie.get(usernameKey);
}