import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminHome from "../pages/admin/home/Home";
import Permanentes from "../pages/admin/permanentes/Permanentes";
import Quadras from "../pages/admin/quadras/Quadras";
import MyProfile from "../pages/private/profile/MyProfile";
import UpdateProfile from "../pages/private/profile/UpdateProfile";
import ForgotPassword from "../pages/public/auth/ForgotPassword";
import Login from "../pages/public/auth/Login";
import Signup from "../pages/public/auth/Signup";
import Page_404 from "../pages/public/error/Page_404";
import Home from "../pages/public/home/Home";
import CadMarcacao from "../pages/public/marcacao/CadMarcacao";
import MeusAgendamentos from "../pages/public/marcacao/MeusAgendamentos";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import RegisterRoute from "./RegisterRoute";

const Routers = () => {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<Page_404 />} />
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      {/* Private */}
      <Route path="/*" element={<RegisterRoute currentUser={currentUser} />}>
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
      <Route path="/*" element={<PrivateRoute currentUser={currentUser} />}>
        <Route path="marcar-quadra" element={<CadMarcacao />} />
        <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Route>
      {/* Admin */}
      <Route path="/*" element={<AdminRoute currentUser={currentUser} />}>
        <Route path="admin/" element={<Navigate to="home" />} />
        <Route path="admin/home" element={<AdminHome />} />
        <Route path="admin/permanentes" element={<Permanentes />} />
        <Route path="admin/quadras" element={<Quadras />} />
      </Route>
      {/* Auth */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Routers;
