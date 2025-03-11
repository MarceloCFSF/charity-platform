import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteLayout = () => {
  const { isAuthenticated }  = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouteLayout;