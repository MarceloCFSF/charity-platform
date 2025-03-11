import axios from 'axios';
import { logoutEvent } from '../events/logoutEvent';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    || 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logoutEvent();
    }

    return Promise.reject(error);
  } 
)

export default api;
