import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Routers from "../../router/Routers";
import { Nav } from "../nav/Nav";

const Layout = (props) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  return (
    <>
      <Nav toggleTheme={props.toggleTheme} />
      {/* {location.pathname.startsWith("/admin") ? (
        <Nav toggleTheme={props.toggleTheme} />
      ) : (
        <Nav toggleTheme={props.toggleTheme} />
      )} */}
      <Routers />
    </>
  );
};

export default Layout;
