import React from "react";

import { Card } from "react-bootstrap";
const ButtonsQuadra = ({ quadra, handleChange, chave, reservada }) => {
  return (
    <Card
      className="card-main-public"
      onClick={
        !reservada
          ? (e) => {
              handleChange(e, quadra);
            }
          : null
      }
      style={
        !reservada
          ? { cursor: "pointer" }
          : { opacity: "0.3", cursor: "not-allowed" }
      }
    >
      <p>
        {quadra.numero} - {quadra.name}
      </p>
      <img className="card-img" src={quadra.foto} alt={quadra.name} />{" "}
    </Card>
  );
};

export default ButtonsQuadra;
