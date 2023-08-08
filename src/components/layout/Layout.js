import React from "react";
import Routers from "../../router/Routers";
import { Nav as PublicNav } from "../public/nav/Nav"
import { Nav as AdminNav } from "../admin/nav/Nav";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
    const { currentUser } = useAuth();
    console.log(`current`, currentUser)
  return (
    <>
    <AdminNav />
    <PublicNav />
    <Routers />
    </>
  )
}

export default Layout