import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { authService, LoginRequest } from "../services/authService";
import { User } from "../../models/user";

export interface AuthProviderType {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const login = (credentials: LoginRequest) => {
    try {
      authService.login(credentials);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrors([...errors, error.message]);
      } else {
        setErrors([...errors, "Um erro desconhecido ocorreu"]);
      }
    }
  };

  const register = (user: Omit<User, 'id'>) => {
    try {
      authService.register(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrors([...errors, error.message]);
      } else {
        setErrors([...errors, "Um erro desconhecido ocorreu"]);
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register }}
    >{children}</AuthContext.Provider>
  );
}

export default AuthProvider;