import React, { useContext, useEffect, useState } from "react";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";

const Esportes = () => {
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const {
    getDataId: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();

  const {
    getDataWhereId: getEsportes,
    data: esportes,
    loading: carregaEsportes,
  } = useGetData();

  useEffect(() => {
    getQuadras("quadras", permanente.quadra);

    return () => {};
  }, [permanente]);

  useEffect(() => {
    if (quadras && Object.keys(quadras).length > 0)
      getEsportes("modalidades", "in", quadras?.esportes);
    // getEsportes("modalidades", "in", quadras?.esportes);
  }, [quadras]);

  useEffect(() => {
    // console.log("esportes", esportes);
  }, [esportes]);

  const handleEsporte = (esporte) => {
    let per = { ...permanente };
    if (per.esporte === esporte.id) {
      per.esporte = "";
      per.dataInicio = "";
      setPermanente(per);
      return;
    } else {
      per.esporte = esporte.id;
      per.dataInicio = "";
      setPermanente(per);
    }
  };

  return (
    <>
      {carregaEsportes ||
        (carregaQuadras && <Loading type={`spin`} width={"30px"} />)}
      {console.log(esportes)}
      {esportes &&
        esportes.map((esporte, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleEsporte(esporte)}
              className={`btn btn-secondary ${
                permanente.esporte === esporte.id ? "btn-active" : ""
              }`}
              // disabled={reservada}
            >
              {`${esporte.display}`}
            </button>
          );
        })}
    </>
  );
};

export default Esportes;
