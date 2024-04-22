import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ currentUser }) => {
  return currentUser?.usuario ? (
    currentUser?.usuario?.checked ? (
      <Outlet />
    ) : (
      <Navigate to="/meu-perfil" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
