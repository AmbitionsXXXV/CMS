import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
  baseURL: '/api',
  timeout: 15000
});

Api.interceptors.request.use(
  (config) => {
    let token = Cookies.get('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Magic'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Api.interceptors.response.use((response) => {
  return response.data;
});

export default Api;
