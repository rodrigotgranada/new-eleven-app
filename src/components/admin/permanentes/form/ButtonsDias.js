import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Horas from "./Horas";

const ButtonsDias = ({ dia, index, tipoQuadra }) => {
  const [selectedDia, setSelectedDia] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getDataWhere, data: quadras, loadingQuadras } = useGetData();
  const { permanente, setPermanente } = useContext(PermanenteContext);

  const handleDia = (dia) => {
    let dias = { ...permanente };
    dias.diaSemana = dia;
    dias.hora = null;
    dias.quadra = null;
    dias.dataInicio = null;
    setPermanente(dias);
  };

  return (
    <>
      <button
        key={index}
        className={`btn btn-primary ${
          permanente.diaSemana === dia.value ? "btn-active" : ""
        }`}
        onClick={() => handleDia(dia.value)}
      >
        {dia.display}
      </button>
    </>
  );
};

export default ButtonsDias;
