import React, { useEffect } from "react";
import useGetData from "../../../hooks/useGetData";
import { FormGroup, Input, Label } from "reactstrap";
import Loading from "../../public/Loading/Loading";

const SelectTipoQuadra = ({ handleSelected, filtro, setFiltro }) => {
  const {
    getData: getModalidades,
    data: modalidades,
    loading: loadMoadalidade,
  } = useGetData();

  const {
    getDataWhereSimple: getQuadras,
    data: quadras,
    loading: loadQuadras,
  } = useGetData();

  useEffect(() => {
    getModalidades("tiposQuadra");
    getQuadras("quadras", "type", "!=", "all");
    return () => {};
  }, []);

  const handleModalidade = async (e) => {
    const { value } = e.target;
    if (value === "all") {
      getQuadras("quadras", "type", "!=", value);
    } else {
      getQuadras("quadras", "type", "==", value);
    }
  };

  return (
    <>
      {loadMoadalidade && <Loading type={`spin`} width={"30px"} />}
      {modalidades && modalidades.length > 0 && (
        <>
          <FormGroup>
            <Label for="tipo">Tipo Quadra</Label>
            <Input
              id="tipo"
              name="tipo"
              type="select"
              onChange={handleModalidade}
            >
              <option value="all">Todos</option>
              {modalidades.map((tipo, index) => {
                return (
                  <option key={index} value={tipo.id}>
                    {tipo.display}
                  </option>
                );
              })}
            </Input>
          </FormGroup>

          {loadQuadras && <Loading type={`spin`} width={"30px"} />}
          {quadras.length > 0 && (
            <>
              <FormGroup>
                <Label for="tipo">Quadra</Label>
                <Input
                  id="espaco"
                  name="espaco"
                  type="select"
                  onChange={handleSelected}
                >
                  <option value="all">Todos</option>
                  {quadras.map((tipo, index) => {
                    return (
                      <option key={index} value={tipo.id}>
                        {`${tipo.name} ${tipo.numero}`}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SelectTipoQuadra;
