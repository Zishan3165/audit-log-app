import { BASE_URL } from '../config';
import api from './api';

export interface CreateSiteRequest {
  name: string;
  region: string;
  description: string;
  lat: number;
  long: number;
}

export interface UpdateSiteRequest {
  name: string;
  region: string;
  description: string;
  lat: number;
  long: number;
}

export default {
  getSites: ({ pageNumber }: { pageNumber: number }) =>
    api.get(`${BASE_URL}/sites`, {
      pageNumber
    }),
  getSite: ({ siteId }: { siteId: string }) => api.get(`${BASE_URL}/sites/${siteId}`),
  createSite: ({ body, userId }: { body: CreateSiteRequest; userId: string }) =>
    api.post(`${BASE_URL}/sites/`, { userId }, body),
  updateSite: ({
    body,
    userId,
    siteId
  }: {
    body: UpdateSiteRequest;
    userId: string;
    siteId: string;
  }) => api.put(`${BASE_URL}/sites/${siteId}`, { userId }, body),
  deleteSite: ({ siteId, userId }: { siteId: string; userId: string }) =>
    api.delete(`${BASE_URL}/sites/${siteId}`, { userId })
};
