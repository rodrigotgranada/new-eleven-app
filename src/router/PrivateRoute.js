import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ currentUser }) => {
  console.log('current', currentUser)
  return currentUser ? currentUser.emailVerified ? <Outlet /> : <Navigate to="/my-profile" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
