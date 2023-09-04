import React, { useContext, useEffect } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";

const ButtonsHorario = ({ dia, esporte, horario, handleChange, chave }) => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getData, data: horarios, loadingHorarios } = useGetData();
  const { getDataWhere, data: quadras, loadingQuadras } = useGetData();
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loadingDisponibilidadeHorario,
  } = useGetData();

  useEffect(() => {
    getData("horarios");
    console.log(`horario`, horario);
    console.log(`esporte`, esporte);
    console.log(`dia`, dia);
  }, []);

  useEffect(() => {
    console.log("horariosTTT", horarios.length);
  }, [horarios]);

  useEffect(() => {
    getDataWhere("quadras", "esportes", "array-contains", {
      display: "Padel",
      id: esporte,
      type: { display: "Piso", id: "OoAxvibwL5Q38cpDSaYh", type: "piso" },
      value: "padel",
    });
  }, [esporte]);
  useEffect(() => {
    console.log("hquadrasTTT", quadras);
  }, [quadras]);

  useEffect(() => {
    getDataWhere3(
      "agenda",
      "dataDia",
      "==",
      dia,
      "esporte",
      "==",
      esporte,
      "dataHorario",
      "==",
      horario.id
    );
  }, [horario, esporte, dia]);

  // useEffect(() => {
  //   console.log("disponibilidadeHorarioTTTT", disponibilidadeHorario.length);
  // }, [disponibilidadeHorario]);

  return (
    <button
      key={chave}
      onClick={(e) => handleChange(e, horario)}
      value={horario}
    >
      {`${horario.value}:00`}
    </button>
  );
};

export default ButtonsHorario;
