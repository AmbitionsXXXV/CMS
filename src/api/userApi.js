import Api from './requset';

export const loginApi = (data) => {
  return Api.post('/user/login', data);
};

export const registerApi = (data) => {
  return Api.post('/user/signup', data);
};

export const getqscountApi = (params) => {
  return Api.get('/user/getqscount', { params });
};

export const getUserListApi = (params) => {
  return Api.get('/user/get_userlist', { params });
};

export const updateUserApi = (data) => {
  return Api.post('/user/update_user', data);
};
