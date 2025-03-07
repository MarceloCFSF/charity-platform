import { User } from "../../models/user";
import api from "./api"

export interface LoginRequest {
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginRequest) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  register: async (user: Omit<User, 'id'>) => {
    const response = await api.post('/register', user);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  }
}
