import { Route, Routes } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes;