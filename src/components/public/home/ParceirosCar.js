import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Card, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import moment from "moment";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const newClass = `${className} flecha-car`;
  return (
    <div
      className={newClass}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  const newClass = `${className} flecha-car`;
  return (
    <div
      className={newClass}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const ParceirosCar = () => {
  const {
    getDataEventos: getParceiros,
    data: parceiros,
    loading: carregaParceiros,
  } = useGetData();

  useEffect(() => {
    getParceiros("parceiros", 'dataInicio', '>=', moment(new Date()).format('YYYY-MM-DD'), 'status', '==', true, "ordem");
    return () => {};
  }, []);

  useEffect(() => {
    return () => {
    }
  }, [parceiros])


  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: parceiros ? parceiros.length > 1 : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // autoplaySpeed: 2000,
    dotsClass: "slick-dots button__bar",
  };

  const openInNewTab = (url) => {
    window.open(`https://${url}`, "_blank", "noopener,noreferrer");
  };
  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };
  return (
    <>
      {carregaParceiros && <Loading type={`spin`} width={"30px"} />}
      {parceiros && parceiros.length == 0 && <p>Nenhum Evento Cadastrado</p>}
      {parceiros && parceiros.length > 0 && (
        <Container>
          <Slider {...settings}>
            {parceiros &&
              parceiros?.map((item, index) => {
                // if(item.status) {
                  return <div key={index} onClick={() => openInNewTab(item.link)}>
                          <Card className="item-slider-card" style={{ backgroundImage: `url(${item.foto})`}}>
                            <div className="legend-eventos">
                              <span className="legend-eventos-span">{item.nome}</span>
                              <span className="legend-eventos-span">Data: {moment(item.dataInicio).format('DD/MM/YYYY')}</span>
                            </div>
                          </Card>
                       </div>
                // }
              })}
          </Slider>
        </Container>
      )}
    </>
  );
};

export default ParceirosCar;
