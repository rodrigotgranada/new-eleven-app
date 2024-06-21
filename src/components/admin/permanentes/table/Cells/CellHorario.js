import React, { useEffect } from "react";
import Loading from "../../../../public/Loading/Loading";
import useGetData from "../../../../../hooks/useGetData";

const CellHorario = ({ id }) => {
  
  const {
    getDataId: getHorario,
    data: horario,
    loading: loadingHorario,
  } = useGetData();
  useEffect(() => {
    getHorario("horarios", id);
    return () => {};
  }, [id]);

  if (loadingHorario) return <Loading type={`spin`} width={"30px"} />;
  if (horario) return <p> {`${horario?.value}:00`} </p>;
};

export default CellHorario;
