import api from "../services/api";
import { useAuth } from "./useAuth"

export const useApi = () => {
  const { logout } = useAuth();

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        logout(false)
      }

      return Promise.reject(error);
    }
  )

  return api;
}