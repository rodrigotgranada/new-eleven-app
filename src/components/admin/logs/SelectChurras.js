import React, { useEffect } from "react";
import useGetData from "../../../hooks/useGetData";
import { FormGroup, Input, Label } from "reactstrap";
import Loading from "../../public/Loading/Loading";

const SelectChurras = ({ handleSelected, filtro, setFiltro }) => {
  const {
    getData: getChurras,
    data: churras,
    loading: loadChurras,
  } = useGetData();

  useEffect(() => {
    getChurras("churrasqueiras");
    return () => {};
  }, []);

  return (
    <>
      {loadChurras && <Loading type={`spin`} width={"30px"} />}
      {churras && churras.length > 0 && (
        <>
          <FormGroup>
            <Label for="tipo">Churrasqueira</Label>
            <Input
              id="espaco"
              name="espaco"
              type="select"
              onChange={handleSelected}
            >
              <option value="all">Todos</option>
              {churras.map((tipo, index) => {
                return (
                  <option key={index} value={tipo.id}>
                    {`${tipo.nome} ${tipo.numero}`}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </>
      )}
    </>
  );
};

export default SelectChurras;
