import { Route, Routes } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider";
import Home from "./pages/Home";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./layouts/DefaultLayout";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRouteLayout />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes;