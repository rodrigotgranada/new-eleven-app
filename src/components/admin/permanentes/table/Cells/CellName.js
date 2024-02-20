import React, { useEffect } from "react";
import useGetData from "../../../../../hooks/useGetData";
import Loading from "../../../../public/Loading/Loading";

const CellName = ({ id }) => {
  const { getDataId: getName, data: name, loading: loadingName } = useGetData();
  useEffect(() => {
    getName("users", id);
    return () => {};
  }, []);

  if (loadingName) return <Loading type={`spin`} width={"30px"} />;
  if (name)
    return (
      <p> {`${name?.displayName} ${name?.sobrenome} (${name.telefone}) `} </p>
    );
};

export default CellName;
