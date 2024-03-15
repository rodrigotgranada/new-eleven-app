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

  // const columns = [
  //   {
  //     id: "id2",
  //     header: "Informações",
  //     columns: [

  //       {
  //         accessorKey: "displayName",
  //         header: "Nome",
  //       },
  //       {
  //         accessorKey: "sobrenome",
  //         header: "Sobrenome",
  //       },
  //       {
  //         accessorKey: "documento",
  //         header: "Documento",
  //       },
  //     ],
  //   },
  //   {
  //     id: "id3",
  //     header: "Contato",
  //     columns: [
  //       {
  //         accessorKey: "telefone",
  //         header: "Telefone",
  //       },
  //       {
  //         accessorKey: "email",
  //         header: "E-mail",
  //       },
  //     ],
  //   },
  // ];

  const columns = [
    {
      accessorKey: "displayName",
      header: "Nome",
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
    },
  ];

  return (
    <Container>
      {/* <Container> */}
      {carregaUsuarios && <p>Carregando...</p>}
      {Object.keys(usuarios).length && (
        <BasicTable data={usuarios} columns={columns} />
      )}
      {/* </Container> */}
    </Container>
  );
};

export default Usuarios;
