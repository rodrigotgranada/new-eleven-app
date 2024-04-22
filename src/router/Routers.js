import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logs from "../pages/admin/logs/Logs";
import Permanentes from "../pages/admin/permanentes/Permanentes";
import Quadras from "../pages/admin/quadras/Quadras";
import Usuarios from "../pages/admin/usuarios/Usuarios";
import MyProfile from "../pages/private/profile/MyProfile";
import ForgotPassword from "../pages/public/auth/ForgotPassword";
import Login from "../pages/public/auth/Login";
import Signup from "../pages/public/auth/Signup";
import Page404 from "../pages/public/error/Page404";
import Home from "../pages/public/home/Home";
import CadMarcacao from "../pages/public/marcacao/CadMarcacao";
import MeusAgendamentos from "../pages/private/marcacao/MeusAgendamentos";
import AdminRoute from "./AdminRoute";
import OwnerRoute from "./OwnerRoute";
import PrivateRoute from "./PrivateRoute";
import RegisterRoute from "./RegisterRoute";
import MinhasTransferencias from "../pages/private/marcacao/MinhasTransferencias";
import Agenda from "../pages/admin/agenda/Agenda";
import Churrasqueiras from "../pages/admin/churrasqueiras/Churrasqueiras";
import Parceiros from "../pages/admin/parceiros/Parceiros";

const Routers = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />

      <Route path="/*" element={<RegisterRoute currentUser={currentUser} />}>
        <Route path="meu-perfil" element={<MyProfile />} />
      </Route>
      <Route path="/*" element={<PrivateRoute currentUser={currentUser} />}>
        <Route path="marcar-quadra" element={<CadMarcacao />} />
        <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
        <Route
          path="minhas-transferencias"
          element={<MinhasTransferencias />}
        />
      </Route>
      {/* Admin */}
      <Route path="/*" element={<AdminRoute currentUser={currentUser} />}>
        <Route path="admin/" element={<Navigate to="agenda" />} />
        <Route path="admin/home" element={<Agenda />} />
        <Route path="admin/agenda" element={<Agenda />} />
        <Route path="admin/permanentes" element={<Permanentes />} />
        <Route path="admin/churrasqueiras" element={<Churrasqueiras />} />
      </Route>
      <Route path="/*" element={<OwnerRoute currentUser={currentUser} />}>
        <Route path="admin/logs" element={<Logs />} />
        <Route path="admin/usuarios" element={<Usuarios />} />
        <Route path="admin/quadras" element={<Quadras />} />
        <Route path="admin/eventos" element={<Parceiros />} />
      </Route>
      {/* Auth */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Routers;
