import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ currentUser }) => {
  return currentUser?.usuario?.rule ? (
    currentUser?.usuario?.checked ? (
      <Outlet />
    ) : (
      <Navigate to="/my-profile" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
