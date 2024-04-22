import React, { useContext, useEffect } from "react";
import Routers from "../../router/Routers";
import { Nav } from "../nav/Nav";
import ConfigContext from "../../contexts/ConfigContext";

const Layout = () => {
  const { configFull } = useContext(ConfigContext);
  useEffect(() => {
    console.log('config', configFull)
    return () => {}
  }, [configFull])

  return (
    <div className="body-main">
      <Nav />
      <Routers />
    </div>
  );
};

export default Layout;
