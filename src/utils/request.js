import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from './auth';
// import router from '@/router';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers['x-token'] = token;
  return config;
});

request.interceptors.response.use(
  (response) => {
    // 接口返回成功，status码为200，但根据返回的data.code码不同处理不同
    // 返回的data.code不为0时默认为错误，错误信息为data.msg
    // 这个根据不同项目自己定义
    if (response.data.code !== 0) {
      Message.error(response.data.msg);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    // 接口报错处理
    Message.error(error.message);
    return Promise.reject(error);
  },
);

export default request;
