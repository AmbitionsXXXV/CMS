import Api from './requset';

const api = 'exam_qs';

export const getAllexQsApi = () => {
  return Api.get(api + '/getAll_exQs');
};

export const insertExqsApi = (data) => {
  return Api.post(api + '/insert_exqs', data);
};

export const getExListbyexamidApi = (params) => {
  return Api.get(api + '/getExList_byexamid', { params });
};

export const deleteQsApi = (params) => {
  return Api.get(api + '/delete_qs', { params });
};
