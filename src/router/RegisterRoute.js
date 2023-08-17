import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterRoute = ({ currentUser }) => {
  useEffect(() => {
    if (!currentUser?.emailVerified) {
      toast.warning("E-mail não verificado!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  return currentUser ? <Outlet /> : <Navigate to="/my-profile" />;
};

export default RegisterRoute;
