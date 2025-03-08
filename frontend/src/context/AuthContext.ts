import { createContext } from "react";
import { LoginRequest } from "../services/authService";
import { User } from "../models/user";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => void;
  register: (user: Omit<User, 'id'>) => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
