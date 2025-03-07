import { createContext } from "react";
import { LoginRequest } from "../services/authService";
import { User } from "../../models/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => void;
  register: (user: Omit<User, 'id'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
