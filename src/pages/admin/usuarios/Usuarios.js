import { Box } from "@mui/material";
import React, { useEffect } from "react";
import BasicTable from "../../../components/layout/BasicTable";
import useGetData from "../../../hooks/useGetData";
import { Container } from "reactstrap";

const Usuarios = () => {
  const {
    getData: getUsuarios,
    data: usuarios,
    loading: carregaUsuarios,
  } = useGetData();

  useEffect(() => {
    getUsuarios("users");
  }, []);

  useEffect(() => {
    Object.keys(usuarios).length && console.log("usuarios", usuarios);
  }, [usuarios]);

  const columns = [
    {
      accessorKey: "displayName",
      header: "Nome",
      size: 50,
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
      size: 50,
    },
  ];

  return (
    <Container>
      {carregaUsuarios && <p>Carregando...</p>}
      {Object.keys(usuarios).length && (
        <BasicTable data={usuarios} columns={columns} />
      )}
    </Container>
  );
};

export default Usuarios;
