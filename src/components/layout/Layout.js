import React from "react";
import Routers from "../../router/Routers";
import { Nav } from "../nav/Nav";

const Layout = () => {
  return (
    <div className="body-main">
      <Nav />
      <Routers />
    </div>
  );
};

export default Layout;
