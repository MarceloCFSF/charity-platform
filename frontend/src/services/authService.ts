import { User } from "../models/user";
import api from "./api"

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginRequest) : Promise<AuthResponse> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  register: async (user: Omit<User, 'id'>): Promise<AuthResponse> => {
    const response = await api.post('/register', user);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  }
}
