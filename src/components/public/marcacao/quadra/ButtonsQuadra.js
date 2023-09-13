import React, { useContext } from "react";

import { Card } from "react-bootstrap";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import "../../../../styles/public/paginaQuadra.scss";

const ButtonsQuadra = ({ quadra, handleChange, chave, reservada }) => {
  console.log("quadra", quadra, "chave", chave, "reservada", reservada);
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const teste = true;
  return (
    <>
      {/* <Button className="btn btn-success"> */}
      <Card
        onClick={
          teste
            ? () => {
                console.log("cliquei");
              }
            : null
        }
        style={teste ? { cursor: "pointer" } : null}
      >
        {quadra.name}
      </Card>
      {/* </Button> */}
    </>
  );
};

export default ButtonsQuadra;
