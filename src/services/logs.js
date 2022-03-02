import { BASE_URL } from '../config';
import api from './api';

export default {
  getLogs: ({ siteId, pageNumber }) =>
    api.get(`${BASE_URL}/logs`, {
      siteId,
      pageNumber
    }),
  getLog: ({ logId }) => api.get(`${BASE_URL}/logs/${logId}`)
};
