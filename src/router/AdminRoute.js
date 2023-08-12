import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ currentUser }) => {
  console.log('admin', currentUser)
  return currentUser?.usuario?.rule ? currentUser.emailVerified ? <Outlet /> : <Navigate to="/my-profile" /> : <Navigate to="/login" />;
};

export default AdminRoute;
