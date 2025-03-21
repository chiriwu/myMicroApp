import axios from 'axios';

var request = axios.create({
  // 后台接口的基准地址
  baseURL: 'https://127.0.0.1:3000',
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    //对相应错误做点什么
    const msg = error.response.data.msg || '请求失败';
    console.log('msg=', msg);
    return Promise.reject(error);
  },
);

//拦截器响应
request.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    //对相应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
