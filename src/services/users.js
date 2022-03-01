import { BASE_URL } from '../config';
import api from './api';

export default {
  loginUser: (user) => api.post(`${BASE_URL}/users/login`, null, user),
  signUp: (user) => api.post(`${BASE_URL}/users/signup`, null, user)
};
