import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const API = axios.create({
  baseURL: BASE_URL,
});

// Add auth token if needed in headers automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
