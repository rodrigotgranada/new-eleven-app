import React, { useEffect, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { FormGroup, Input, Label } from "reactstrap";

const SelectAcao = ({ handleSelected, filtro, setFiltro }) => {
  const acoes = [
    { acao: "add", display: "Novo" },
    { acao: "remove", display: "Delete" },
  ];
  return (
    <>
      <FormGroup>
        <Label for="tipo">Ação</Label>
        <Input id="acao" name="acao" type="select" onChange={handleSelected}>
          <option value="all">Todos</option>
          {acoes.map((valor, index) => {
            return (
              <option key={index} value={valor.acao}>
                {`${valor.display}`}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    </>
  );
};

export default SelectAcao;
