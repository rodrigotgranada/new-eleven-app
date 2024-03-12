import React, { useEffect, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { FormGroup, Input, Label } from "reactstrap";

const SelectHora = ({ handleSelected, filtro, setFiltro }) => {
  const [valores, setValores] = useState([]);
  const {
    getDataOrderBy: getHorarios,
    data: horarios,
    loading: loadHorarios,
  } = useGetData();

  useEffect(() => {
    if (filtro.tipo === "quadra") {
      getHorarios("horarios", "value", "asc");
    } else {
      setValores([
        {
          value: "Dia",
          id: "dia",
        },
        { value: "Noite", id: "noite" },
      ]);
    }
    return () => {};
  }, [filtro]);

  useEffect(() => {
    // console.log("horarios", horarios);
    setValores(horarios);
    return () => {};
  }, [horarios]);

  // useEffect(() => {
  //   console.log("valores", valores);
  //   return () => {};
  // }, [valores]);

  return (
    <>
      {valores && valores.length > 0 && (
        <FormGroup>
          <Label for="tipo">
            {filtro.tipo === "quadra" ? "Hora" : "Turno"}
          </Label>
          <Input id="hora" name="hora" type="select" onChange={handleSelected}>
            <option value="all">Todos</option>
            {valores.map((valor, index) => {
              return (
                <option key={index} value={valor.id}>
                  {`${valor.value}${filtro.tipo === "quadra" ? ":00" : ""}`}
                </option>
              );
            })}
          </Input>
        </FormGroup>
      )}
    </>
  );
};

export default SelectHora;
