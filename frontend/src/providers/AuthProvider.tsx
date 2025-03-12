import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { authService, LoginRequest } from "../services/authService";
import { User } from "../models/user";
import { AxiosError } from "axios";

export interface AuthProviderType {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderType) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleLogout = () => logout(false);
    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    }
  }, [])

  const authenticate = (token: string, user: User) => {
    setError(null);
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const login = async (credentials: LoginRequest) => {
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
    try {
      const { token, user } = await authService.register(newUser);
      authenticate(token, user);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          if (errors.email) {
            setError(errors.email[0]);
          } else {
            setError("Erro ao cadastrar. Verifique os dados.");
          }
        } else {
          setError("Não foi possível cadastrar o usuário");
        }
      } else {
        setError("Um erro desconhecido ocorreu");
      }
    }
  };

  const logout = async (isApi: boolean = true) => {
    if (isApi) await authService.logout();

    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user,
        loading,
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