import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const OwnerRoute = ({ currentUser }) => {
  return currentUser?.usuario?.rule &&
    currentUser?.usuario?.owner &&
    currentUser?.usuario?.checked ? (
    currentUser.emailVerified ? (
      <Outlet />
    ) : (
      <Navigate to="/my-profile" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default OwnerRoute;
