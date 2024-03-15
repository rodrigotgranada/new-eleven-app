import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import ButtonDate from "./ButtonDate";
import moment from "moment";
import SelectEspaco from "./SelectEspaco";
import SelectHora from "./SelectHora";
import SelectTipoQuadra from "./SelectTipoQuadra";
import SelectChurras from "./SelectChurras";
import SelectAcao from "./SelectAcao";
import useGetData from "../../../hooks/useGetData";

const FilterLogs = () => {
  const { getDataWhereOrderBy4, data, loading } = useGetData();
  const [filtro, setFiltro] = useState({
    tipo: "",
    dia: moment(new Date()).format("YYYY-MM-DD"),
    espaco: "",
    hora: "",
    acao: "",
  });
  const [resultados, setResultados] = useState(null);
  const tipos = [
    {
      id: 0,
      display: "Quadras",
      value: "quadra",
    },
    {
      id: 1,
      display: "Churrasqueiras",
      value: "churras",
    },
  ];

  useEffect(() => {
    handleSearch();
    return () => {};
  }, [filtro]);

  const handleSelected = (e, info) => {
    const { value, name } = e.target;
    const filter = { ...filtro };
    filter[name] = value === "all" ? "" : value;
    if (info) {
      filter.espaco = "";
      filter.hora = "";
      filter.acao = "";
    }
    setFiltro(filter);
  };

  const handleDate = (e) => {
    const filter = { ...filtro };
    filter.dia = e;
    setFiltro(filter);
  };

  const handleSearch = async () => {
    const resultado = await getDataWhereOrderBy4(
      "log_agenda",
      { campo: "createdAt", direcao: "desc" },
      filtro.tipo ? { campo: "tipo", tipo: "==", valor: filtro.tipo } : null,
      filtro.dia ? { campo: "dataDia", tipo: "==", valor: filtro.dia } : null,
      filtro.espaco
        ? { campo: "espaco", tipo: "==", valor: filtro.espaco }
        : null,
      filtro.hora ? { campo: "hora", tipo: "==", valor: filtro.hora } : null,
      filtro.acao ? { campo: "acao", tipo: "==", valor: filtro.acao } : null
    );

    setResultados(resultado);
  };
  return (
    <>
      <h1>Filtro</h1>

      <Form>
        <FormGroup>
          <Label for="tipo">Tipo</Label>
          <Input
            id="tipo"
            name="tipo"
            type="select"
            onChange={(e) => handleSelected(e, "reset")}
          >
            <option value="all">Todos</option>
            {tipos.map((tipo, index) => {
              return (
                <option key={index} value={tipo.value}>
                  {tipo.display}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="dataDai">Data Marcacao</Label>
          <ButtonDate
            handleDate={handleDate}
            filtro={filtro}
            setFiltro={setFiltro}
          />
        </FormGroup>
        {filtro && filtro.tipo != "all" && (
          <>
            {filtro.tipo === "quadra" && (
              <>
                <SelectTipoQuadra
                  handleSelected={handleSelected}
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
              </>
            )}
            {filtro.tipo === "churras" && (
              <>
                <SelectChurras
                  handleSelected={handleSelected}
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
              </>
            )}
            {filtro.tipo != "" && (
              <>
                <SelectHora
                  handleSelected={handleSelected}
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
              </>
            )}
          </>
        )}
        <SelectAcao
          handleSelected={handleSelected}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSearch()}
        >
          Pesquisar
        </button>
      </Form>
      <div>
        {(!resultados || resultados.length == 0) && (
          <p>Nenhum resultado encontrado</p>
        )}

        {resultados && resultados.length > 0 && (
          <>
            {resultados.map((resultado, index) => {
              // console.log("resultadoXXX", resultado);
              return <p key={index}> {resultado.texto}</p>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default FilterLogs;
