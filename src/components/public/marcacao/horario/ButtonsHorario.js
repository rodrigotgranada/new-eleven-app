import moment from "moment";
import React, { useEffect, useState } from "react";
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
  const [horaPassada, setHoraPassada] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getDataWhere, data: quadras, loadingQuadras } = useGetData();
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loading: loadingDisponibilidadeHorario,
  } = useGetData();

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
    verificaHorarioPassado();
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

  const verificaHorarioPassado = () => {
    let strDataMarcada = moment(`${dia.split("/").reverse().join("-")}`);
    let strDataAtual = moment();
    let horaQuadra = parseInt(horario.value);
    let horaAtual = moment().toObject().hours;

    if (strDataAtual.isSame(strDataMarcada, "day")) {
      if (horaQuadra < horaAtual) {
        setHoraPassada(true);
      }
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
          disabled={lotado | horaPassada}
        >
          {lotado ? `Lotado` : `${horario.value}:00`}
        </button>
      )}
    </>
  );
};

export default ButtonsHorario;
