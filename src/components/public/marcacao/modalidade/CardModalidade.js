import { Card } from "@mui/material";
import React from "react";

const CardModalidade = ({ modalidade, handleChange }) => {
  return (
    <Card
      onClick={() => handleChange(modalidade)}
      className="card-modalidade-button"
      style={{
        backgroundImage: `url(${modalidade.capa})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <p className="text-modalidade">{modalidade.display}</p>
      {/* <img
        src={modalidade.capa}
        alt={modalidade.display}
        style={{ objectFit: "contain" }}
      /> */}
    </Card>
  );
};

export default CardModalidade;
