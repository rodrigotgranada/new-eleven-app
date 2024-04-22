import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterRoute = ({ currentUser }) => {
  useEffect(() => {
    if (currentUser) {
      if (!currentUser?.usuario?.checked) {
        toast.warning("Usuário não verificado!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/meu-perfil" />;
};

export default RegisterRoute;
