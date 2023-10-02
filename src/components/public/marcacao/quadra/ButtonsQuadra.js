import React, { useContext } from "react";

import { Card } from "react-bootstrap";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
// import "../../../../styles/public/cardQuadraPublic.scss";
const ButtonsQuadra = ({ quadra, handleChange, chave, reservada }) => {
  console.log("quadra", quadra, "chave", chave, "reservada", reservada);
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const teste = true;
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
      <img
        className="card-img"
        src={quadra.foto}
        alt={quadra.name}
        // style={{ width: "9rem", height: "9rem" }}
      />{" "}
    </Card>
  );
};

export default ButtonsQuadra;
