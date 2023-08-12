import React from "react";
import Routers from "../../router/Routers";
import { Nav as PublicNav } from "../public/nav/Nav"
import { Nav as AdminNav } from "../admin/nav/Nav";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
    const { currentUser } = useAuth();
  return (
    <>
    {location.pathname.startsWith("/admin") ? <AdminNav /> : <PublicNav />}
    <Routers />
    </>
  )
}

export default Layout