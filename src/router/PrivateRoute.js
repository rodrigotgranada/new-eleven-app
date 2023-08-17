import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ currentUser }) => {
  return currentUser ? (
    currentUser.emailVerified ? (
      <Outlet />
    ) : (
      <Navigate to="/my-profile" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
