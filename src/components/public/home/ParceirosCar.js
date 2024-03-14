import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

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
    getData: getParceiros,
    data: parceiros,
    loading: carregaParceiros,
  } = useGetData();

  useEffect(() => {
    getParceiros("parceiros");
    return () => {};
  }, []);

  const settings = {
    // vertical: false,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // slidesPerRow: 1,
    // centerMode: true,
    // arrows: true,
    // centerPadding: "15%",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };
  return (
    <>
      {carregaParceiros && <Loading type={`spin`} width={"30px"} />}
      {parceiros && parceiros.length == 0 && <p>Nenhum parceiro cadastrado</p>}
      {parceiros && parceiros.length > 0 && (
        <Container>
          <Slider {...settings}>
            {parceiros &&
              parceiros?.map((item, index) => (
                <div
                  key={index}
                  className={`slide-item`}
                  style={{
                    backgroundColor: "red",
                    backgroundImage: `${item.foto}`,
                    width: "100%",
                  }}
                  onClick={() => onClickUrl(item.link)}
                >
                  <img
                    alt={item.nome}
                    src={item.foto}
                    style={{ width: "10rem", height: "7rem" }}
                    onClick={() => onClickUrl(item.link)}
                  />

                  <ExternalLink href={item.link}>{item.nome}</ExternalLink>
                </div>
              ))}
          </Slider>
        </Container>
      )}
    </>
  );
};

export default ParceirosCar;
