import React, { useContext, useEffect } from "react";
import PermanenteContext from "../../../../contexts/PermanenteContext";

const ButtonsQuadras = ({ quadra, reservada }) => {
  const { permanente, setPermanente } = useContext(PermanenteContext);

  const handleQuadra = (quadra) => {
    let per = { ...permanente };
    if (per.quadra === quadra.id) {
      per.quadra = "";
      per.esporte = "";
      per.dataInicio = "";
      setPermanente(per);
      return;
    } else {
      per.quadra = quadra.id;
      per.esporte = "";
      per.dataInicio = "";
      setPermanente(per);
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleQuadra(quadra)}
      className={`btn btn-secondary ${
        permanente.quadra === quadra.id ? "btn-active" : ""
      }`}
      disabled={reservada}
    >
      {`${quadra.numero} - ${quadra.name}`}
    </button>
  );
};

export default ButtonsQuadras;
