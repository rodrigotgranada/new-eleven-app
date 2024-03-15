import React from "react";
import "../../../styles/public/home.scss";
import logo from "../../../assets/Logos/simbolFinal.png";
import { Container } from "reactstrap";
import ParceirosCar from "../../../components/public/home/ParceirosCar";
const Home = () => {
  return (
    <>
      <Container>
        <section className="home-welcome">
          <div className="banner-eleven">
            <h3>Bem vindo ao Eleven Sports</h3>
            <img className="home-logo" src={logo} />
          </div>
        </section>
        <section className="home-parceiros">
          <h4 className="title-parceiros">Parceiros</h4>
          <ParceirosCar />
        </section>
        {/* <section className="home-atividades">
          <h4>Atividades</h4>
        </section> */}
      </Container>
    </>
  );
};

export default Home;
