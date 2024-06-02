import { BASE_URL } from '../config';
import { User } from '../web/types';
import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export default {
  loginUser: (request: LoginRequest) => api.post(`${BASE_URL}/users/login`, null, request),
  getUser: (userId: string) => api.get(`${BASE_URL}/users/${userId}`),
  signUp: (user: SignUpRequest) => api.post(`${BASE_URL}/users/signup`, null, user)
};
