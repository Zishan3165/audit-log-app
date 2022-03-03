import { BASE_URL } from '../config';
import api from './api';

export default {
  loginUser: (user) => api.post(`${BASE_URL}/users/login`, null, user),
  getUser: (userId) => api.get(`${BASE_URL}/users/${userId}`),
  signUp: (user) => api.post(`${BASE_URL}/users/signup`, null, user)
};
