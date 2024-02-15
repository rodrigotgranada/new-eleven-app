import React, { useContext, useEffect } from "react";
import useGetData from "../../../../hooks/useGetData";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Loading from "../../../public/Loading/Loading";
import ButtonsQuadras from "./ButtonsQuadras";

const Quadras = () => {
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const {
    getDataWhereOrderByLimit: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loading: loadingDisponibilidadeHorario,
  } = useGetData();

  useEffect(() => {
    // getQuadras("quadras", "esportes", "asc", "numero", "asc");
    getQuadras("quadras", "type", "==", permanente.tipoQuadra, "numero", "asc");
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
      permanente.hora
    );

    return () => {};
  }, [permanente]);

  // useEffect(() => {
  //   console.log("disponibilidadeHorario", disponibilidadeHorario);
  //   console.log("quadras", quadras);
  // }, [disponibilidadeHorario]);

  return (
    <>
      {carregaQuadras && loadingDisponibilidadeHorario && (
        <Loading type={`spin`} width={"30px"} />
      )}
      {Object.keys(quadras).length > 0 &&
        quadras.map((quadra, index) => {
          let reservada = false;
          disponibilidadeHorario
            .filter((quadraOcupada) => quadraOcupada["quadra"] === quadra.id)
            .map((quadra2) => {
              if (quadra2) {
                reservada = true;
              }
            });

          return (
            <ButtonsQuadras
              key={index}
              quadra={quadra}
              // handleChange={handleChange}
              // chave={index}
              reservada={reservada}
            />
          );
        })}
    </>
  );
};

export default Quadras;
