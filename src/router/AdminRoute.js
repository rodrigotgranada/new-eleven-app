import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ currentUser }) => {
  return currentUser?.usuario?.rule ? (
    currentUser?.usuario?.checked ? (
      <Outlet />
    ) : (
      <Navigate to="/meu-perfil" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
