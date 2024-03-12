import React, { useEffect, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { FormGroup, Input, Label } from "reactstrap";
import Loading from "../../public/Loading/Loading";

const SelectEspaco = ({ handleSelected, filtro, setFiltro }) => {
  const [loading, setLoading] = useState(true);
  const [espacos, setEspacos] = useState([]);
  const {
    getDataWhereSimple: getQuadras,
    data: quadras,
    loading: loadQuadras,
  } = useGetData();
  const {
    getData: getModalidades,
    data: modalidades,
    loading: loadMoadalidade,
  } = useGetData();
  const {
    getData: getChurras,
    data: churras,
    loading: loadChurras,
  } = useGetData();
  useEffect(() => {
    getInfos();

    return () => {};
  }, [filtro]);

  const getInfos = async () => {
    if (filtro.tipo === "quadra") {
      const resultModalidade = await getModalidades("tiposQuadra");
      console.log("resultModalidade", resultModalidade);
    } else {
      const resultChurras = await getChurras("churrasqueiras");

      // resultChurras && setLoading(false);
    }
    // filtro.tipo === "quadra" ? getData("quadras") : getData("churrasqueiras");
  };

  useEffect(() => {
    setLoading(false);
    if (quadras.length > 0) {
      setEspacos(quadras);
    }
    if (churras.length > 0) {
      setEspacos(churras);
    }
    return () => {};
  }, [churras, quadras]);

  useEffect(() => {
    console.log("espacos", espacos);

    return () => {};
  }, [espacos]);

  const handleModalidade = async (e) => {
    const { value } = e.target;
    console.log("value", value);
    const resultadoF = await getQuadras("quadras", "type", "==", value);
    console.log("RESULTR", resultadoF);
  };

  return (
    <>
      {loading && <Loading type={`spin`} width={"30px"} />}
      {filtro.tipo === "quadra" && modalidades.length > 0 && (
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
        </>
      )}
      {/* {data && data.length > 0 && (
        <>
          {}
          <FormGroup>
            <Label for="espaco">
              {filtro.tipo != "quadra" ? "Churrasqueira" : "Quadra"}
            </Label>
            <Input
              id="tipo"
              name="tipo"
              type="select"
              onChange={handleSelected}
            >
              <option value="all">Todos</option>
              {data.map((tipo, index) => {
                return (
                  <option key={index} value={tipo.id}>
                    {filtro.tipo === "quadra"
                      ? `${tipo.name} ${tipo.numero}`
                      : `${tipo.nome} ${tipo.numero}`}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </>
      )} */}
    </>
  );
};

export default SelectEspaco;
