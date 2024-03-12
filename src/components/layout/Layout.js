import React, { useEffect } from "react";
import Routers from "../../router/Routers";
import { Nav } from "../nav/Nav";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    console.log("usuario", currentUser);

    return () => {};
  }, []);

  return (
    <div className="body-main">
      <Nav />
      <Routers />
    </div>
  );
};

export default Layout;
