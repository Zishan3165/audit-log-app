import { BASE_URL } from '../config';
import api from './api';

export default {
  getLogs: ({ siteId, pageNumber }: { siteId: string; pageNumber: number }) =>
    api.get(`${BASE_URL}/logs`, {
      siteId,
      pageNumber
    }),
  getLog: ({ logId }: { logId: string }) => api.get(`${BASE_URL}/logs/${logId}`)
};
