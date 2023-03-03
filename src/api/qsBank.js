import Api from './requset';

const api = '/qsBank';

export const getqslistApi = (params) => {
  return Api.get(api + '/get_qs_list', { params });
};

export const getallqslistApi = (params) => {
  return Api.get(api + '/get_allqslist', { params });
};

export const getalltagApi = () => {
  return Api.get('/qstype/getAll_tag');
};
//新增接口
export const addqslistApi = (id, data) => {
  return Api.post(api + '/qs_insert?creatorId=' + id, data);
};

export const updateQsApi = (data) => {
  return Api.post(api + '/update_qs', data);
};

export const qsdeleteOrstatusApi = (params) => {
  return Api.get(api + '/qs_deleteOrstatus', { params });
};

export const updateTagApi = (data) => {
  return Api.post('/qstype/update_tag', data);
};

export const addTagApi = (data) => {
  return Api.post('/qstype/insert_tag', data);
};

export const deleteTagApi = (params) => {
  return Api.get('/qstype/delete_tag', { params });
};
