import React, { useContext, useEffect } from "react";
import "../../../styles/public/home.scss";
import logo from "../../../assets/Logos/simbolFinal.png";
import { Container } from "reactstrap";
import ParceirosCar from "../../../components/public/home/ParceirosCar";
import HomeButtons from "../../../components/public/home/HomeButtons";
import ConfigContext from "../../../contexts/ConfigContext";
import BemVindo from "../bemVindo/BemVindo";
import { useAuth } from "../../../contexts/AuthContext";
const Home = () => {
  const { configFull } = useContext(ConfigContext);
  const { currentUser } = useAuth();
  useEffect(() => {
    return () => {}
  }, [configFull])
  return (
    <>
      <Container>
        { configFull?.beta && currentUser && (
          <>
            <BemVindo />
          </>
        )}
        { configFull?.beta && !currentUser && (
          <>
            <section className="home-welcome">
              <HomeButtons />
            </section>
            <section className="home-parceiros">
              <h4 className="title-parceiros">Eventos</h4>
              <ParceirosCar />
            </section>
          </>
        )}
        { !configFull?.beta && (
          <>
            <section className="home-welcome">
              <HomeButtons />
            </section>
            <section className="home-parceiros">
              <h4 className="title-parceiros">Eventos</h4>
              <ParceirosCar />
            </section>
          </>
        )}

      </Container>
    </>
  );
};

export default Home;
