import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ currentUser }) => {
  return currentUser?.usuario ? (
    currentUser?.usuario?.checked ? (
      <Outlet />
    ) : (
      <Navigate to="/my-profile" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
