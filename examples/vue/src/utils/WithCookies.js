import Cookies from 'js-cookie';
// var Cookies = require('js-cookie')

// 还得使用js判断是否使用jwt、数据库保存用户登录数据
console.log('cookies', Cookies);
export const setCookies = function () {
  return Cookies.set('token', 'thisisRandomNumberYouNeedChangeLater');
};

export const getCookies = function () {
  return Cookies.get('token');
};

export const clearCookies = function () {
  return Cookies.remove('token');
};

export default {
  setCookies,
  getCookies,
  clearCookies,
};

// Create a cookie that expires 7 days from now, valid across the entire site:
// Cookies.set('name', 'value', { expires: 7 });

// // Create an expiring cookie, valid to the path of the current page:
// Cookies.set('name', 'value', { expires: 7, path: '' });
