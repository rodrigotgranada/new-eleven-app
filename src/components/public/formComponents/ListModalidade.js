import React, { useEffect } from "react";
import useGetData from "../../../hooks/useGetData";

const ListModalidade = ({ id }) => {
  //   console.log("id", id);
  const {
    getDataId: getModalidade,
    data: modalidade,
    loading: carregaModalidades,
  } = useGetData();

  useEffect(() => {
    getModalidade("modalidades", id);
  }, []);

  //   useEffect(() => {
  //     console.log("modalidadexxxxxx", modalidade);
  //   }, [modalidade]);

  return (
    <>
      {carregaModalidades && <span>Carregando...</span>}
      {Object.keys(modalidade).length > 0 && <span>{modalidade.display}</span>}
    </>
  );
};

export default ListModalidade;
