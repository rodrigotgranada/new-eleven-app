import React, { useEffect } from "react";
import useGetData from "../../../../../hooks/useGetData";
import Loading from "../../../../public/Loading/Loading";

const CellQuadra = ({ id }) => {
  const {
    getDataId: getQuadra,
    data: quadra,
    loading: loadingQuadra,
  } = useGetData();
  useEffect(() => {
    getQuadra("quadras", id);
    return () => {};
  }, [id]);

  if (loadingQuadra) return <Loading type={`spin`} width={"30px"} />;
  if (quadra) return <p> {`${quadra?.name} (${quadra.numero})`} </p>;
};

export default CellQuadra;
