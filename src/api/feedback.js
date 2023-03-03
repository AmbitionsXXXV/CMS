import Api from './requset';

const api = '/feedback';

export const getAllFeedbackApi = (params) => {
  return Api.get(api + '/getAll_feedback', { params });
};

export const deleteFeedback = (params) => {
  return Api.get(api + '/delete_feedback', { params });
};

export const solveFeedbackApi = (data) => {
  return Api.post(api + '/solve_feedback', data);
};
