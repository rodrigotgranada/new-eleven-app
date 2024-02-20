import React, { useEffect } from "react";
import useGetData from "../../../../../hooks/useGetData";
import Loading from "../../../../public/Loading/Loading";

const CellModalidade = ({ id }) => {
  const {
    getDataId: getEsporte,
    data: esporte,
    loading: loadingEsporte,
  } = useGetData();
  useEffect(() => {
    getEsporte("modalidades", id);
    return () => {};
  }, []);

  if (loadingEsporte) return <Loading type={`spin`} width={"30px"} />;
  if (esporte) return <p> {`${esporte?.display}`} </p>;
};

export default CellModalidade;
