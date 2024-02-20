import React, { useContext, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import { useEffect } from "react";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Loading from "../../../public/Loading/Loading";

const ButtonsHoras = ({ horario, index }) => {
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loading: loadingDisponibilidadeHorario,
  } = useGetData();
  const { getDataWhere, data: quadras, loadingQuadras } = useGetData();
  const [lotado, setLotado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataWhere3(
      "permanentes",
      "diaSemana",
      "==",
      permanente.diaSemana,
      "tipoQuadra",
      "==",
      permanente.tipoQuadra,
      "hora",
      "==",
      horario.id
    );
  }, [horario]);

  useEffect(() => {
    if (permanente.tipoQuadra) {
      getDataWhere("quadras", "type", "==", permanente.tipoQuadra);
    }
  }, [permanente]);

  useEffect(() => {
    let ocupadas = [];
    if (
      Object.keys(quadras).length > 0 &&
      Object.keys(disponibilidadeHorario).length > 0
    ) {
      quadras.map((quadra) => {
        disponibilidadeHorario
          .filter((vendor) => vendor["quadra"] === quadra.id)
          .map((quadra2) => {
            ocupadas.push(quadra2);
          });
      });
    }
    verificaLotado(quadras, ocupadas);
    setLoading(false);
  }, [permanente, quadras, disponibilidadeHorario]);

  const verificaLotado = (quadras, ocupadas) => {
    if (ocupadas.length >= quadras.length) {
      setLotado(true);
    }
    if (ocupadas.length < quadras.length) {
      setLotado(false);
    }
  };

  const handleHora = (hora) => {
    let per = { ...permanente };
    per.hora = hora;
    per.quadra = "";
    per.esporte = "";
    per.dataInicio = "";
    setPermanente(per);
  };

  return (
    <>
      {loading && <Loading type={`spin`} width={"30px"} />}
      {!loading && (
        <button
          key={index}
          type="button"
          className={`btn btn-secondary ${
            permanente.hora === horario.id ? "btn-active" : ""
          }`}
          onClick={() => handleHora(horario.id)}
          disabled={lotado}
        >
          {lotado ? `Lotado` : `${horario.value}:00`}
        </button>
      )}
    </>
  );
};

export default ButtonsHoras;
