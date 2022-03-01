import { BASE_URL } from '../config';
import api from './api';

export default {
  getSites: ({ pageNumber }) =>
    api.get(`${BASE_URL}/sites`, {
      pageNumber
    }),
  getSite: ({ siteId }) => api.get(`${BASE_URL}/sites/${siteId}`),
  createSite: ({ body, userId }) => api.post(`${BASE_URL}/sites/`, { userId }, body),
  updateSite: ({ body, userId, siteId }) =>
    api.put(`${BASE_URL}/sites/${siteId}`, { userId }, body),
  deleteSite: ({ siteId, userId }) => api.delete(`${BASE_URL}/sites/${siteId}`, { userId })
};
