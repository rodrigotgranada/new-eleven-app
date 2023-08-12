import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterRoute = ({ currentUser }) => {
  return currentUser ?  <Outlet />  : <Navigate to="/login" />;
};

export default RegisterRoute;
