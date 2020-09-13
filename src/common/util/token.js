import * as Cookie from './cookie';

const TokenKey = 'Admin_Token';

/**
*@description:
*@param{}
*/
export function setToken(token, day) {
    Cookie.setCookie(TokenKey, token, day);
}

/**
*@description: 获取token值
*@return: token值
*/
export function getToken() {
    return Cookie.getCookie(TokenKey);
}

/**
*@description:删除token
*/
export function delToken() {
    Cookie.delCookie(TokenKey);
}
