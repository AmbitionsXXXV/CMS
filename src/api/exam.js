import Api from './requset';

const api = '/exam';

export const getallexamlistApi = (params) => {
  return Api.get(api + '/getall_examlist', { params });
};

export const updateexam = (data) => {
  return Api.post(api + '/update_exam', data);
};

export const addexam = (data) => {
  return Api.post(api + '/add_exam', data);
};

export const releaseexam = (params) => {
  return Api.get(api + '/release_exam', { params });
};
