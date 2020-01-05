import axios from 'axios';
import qs from 'qs';

// 设定不同环境下 baseUrl 的值
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseUrl = 'http://api.maoshuli.com';
    break;
  case 'test':
    axios.defaults.baseUrl = 'http://127.0.0.1:8000';
    break;
  default:
    axios.defaults.baseUrl = 'http://127.0.0.1:3000';
}

/**
 * 设置超时时间，以及跨域是否携带凭证
 */
axios.defaults.timeout = 10000;

axios.defaults.withCredentials = true;

// 设置请求格式(需要根据后台要求格式)
// x-www-from-urlencoded
axios.defaults.headers['Content-Type'] = 'application/x-www-from-urlencoded';

// 只对 post 请求才有用
axios.defaults.transfromRequest = data => {
  return qs.stringfy(data);
};

// axios.post(url, data)

// 请求拦截器
// TOKEN 校验
axios.interceptors.request.use((config) => {
  // 请求携带 TOKEN
  // token 保存在本地
  // let token = '';

  token && (config.headers.Authorization = token);

  return config;

}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 * 服务器返回信息 =》 【相应拦截器同意处理】 =》 客户端JS获取到信息
 */
axios.interceptors.response.use(response => {

}, error => {
  let {response} = error;
  if (response) {
    // 返回了结果


  } else {
    // 未返回结果
    // 如果断网
    if (!window.navigator.onLine) {
      return new Error('网络链接问题');
    }

    return Promise.reject(error);
  }
});

export default axios;
