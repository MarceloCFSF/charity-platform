import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { authService, LoginRequest } from "../services/authService";
import { User } from "../models/user";
import { AxiosError } from "axios";

export interface AuthProviderType {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const resetErrors = () => { setError(null) };

  const authenticate = (token: string, user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const login = async (credentials: LoginRequest) => {
    resetErrors();

    try {
      const { token, user } = await authService.login(credentials);
      authenticate(token, user);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError("Email ou senha inválidos");
      } else {
        setError("Um erro desconhecido ocorreu");
      }
    }
  };

  const register = async (newUser: Omit<User, 'id'>) => {
    resetErrors();

    try {
      const { token, user } = await authService.register(newUser);
      authenticate(token, user);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError("Não foi possível cadastrar o usuário");
      } else {
        setError("Um erro desconhecido ocorreu");
      }
    }
  };

  const logout = () => {
    resetErrors();

    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user,
        isAuthenticated,
        login,
        logout,
        register,
        error
      }}
    >{children}</AuthContext.Provider>
  );
}

export default AuthProvider;