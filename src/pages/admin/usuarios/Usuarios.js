import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../components/layout/BasicTable";
import useGetData from "../../../hooks/useGetData";
import { Container } from "reactstrap";

const Usuarios = () => {
  const [user, setUser] = useState([])
  const {
    getData: getUsuarios,
    data: usuarios,
    loading: carregaUsuarios,
  } = useGetData();

  useEffect(() => {
    getUsuarios("users");
  }, []);

  useEffect(() => {
    // Object.keys(usuarios).length && console.log("usuarios", usuarios);
    const newUsers = usuarios.map(usuario => {
      const tempName = `${usuario.displayName} ${usuario.sobrenome}`
      const newName = tempName.trim().split(" ");
      const fullName = `${newName[0]} ${newName[newName.length - 1]}`
      usuario.displayName = fullName
      return usuario
    })
    setUser(newUsers)
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
      {Object.keys(user).length && (
        <BasicTable data={user} columns={columns} />
      )}
    </Container>
  );
};

export default Usuarios;
