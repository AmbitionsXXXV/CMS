import Api from './requset';

const api = '/article';
const api2 = '/articletag';
//获取全部
export const getArticleApi = (params) => {
  return Api.get(api + '/get_article', { params });
};
//添加
export const addarticle = (data) => {
  return Api.post(api + '/insert_article', data);
};
//修改
export const updatearticle = (data) => {
  return Api.post(api + '/update_article', data);
};
//删除
export const deletearticle = (params) => {
  return Api.get(api + '/delete_article', { params });
};
export const updateTagApi = (data) => {
  return Api.post(api2 + '/update_tag', data);
};

export const addTagApi = (data) => {
  return Api.post(api2 + '/insert_tag', data);
};

export const deleteTagApi = (params) => {
  return Api.get(api2 + '/delete_tag', { params });
};
export const getalltagApi = () => {
  return Api.get(api2 + '/getAll_tag');
};
