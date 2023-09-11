import React, { useContext, useEffect, useState } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../Loading/Loading";

const ButtonsHorario = ({
  dia,
  tipoQuadra,
  esporte,
  horario,
  handleChange,
  chave,
}) => {
  const [lotado, setLotado] = useState(false);
  const [loading, setLoading] = useState(true);
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getData, data: horarios, loadingHorarios } = useGetData();
  const { getDataWhere, data: quadras, loadingQuadras } = useGetData();
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loading: loadingDisponibilidadeHorario,
  } = useGetData();

  useEffect(() => {
    getData("horarios");
  }, []);

  useEffect(() => {
    getDataWhere("quadras", "esportes", "array-contains", esporte);
  }, [esporte]);

  useEffect(() => {
    getDataWhere3(
      "agenda",
      "dataDia",
      "==",
      dia,
      "tipoQuadra",
      "==",
      tipoQuadra,
      "dataHorario",
      "==",
      horario.id
    );
  }, [horario, esporte, tipoQuadra, dia]);

  useEffect(() => {
    if (
      Object.keys(quadras).length > 0 &&
      Object.keys(disponibilidadeHorario).length > 0
    ) {
      let ocupadas = [];
      quadras.map((quadra) => {
        disponibilidadeHorario
          .filter((vendor) => vendor["quadra"] === quadra.id)
          .map((quadra2) => {
            ocupadas.push(quadra2);
          });
      });
      verificaLotado(quadras, ocupadas);
    }
    setLoading(false);
  }, [quadras, disponibilidadeHorario]);

  const verificaLotado = (quadras, ocupadas) => {
    if (ocupadas.length >= quadras.length) {
      setLotado(true);
    }
  };

  return (
    <>
      {loading && <Loading type={`spin`} width={"30px"} />}
      {!loading && (
        <button
          key={chave}
          onClick={(e) => handleChange(e, horario)}
          value={horario}
          disabled={lotado}
        >
          {lotado ? `Lotado` : `${horario.value}:00`}
        </button>
      )}
    </>
  );
};

export default ButtonsHorario;
