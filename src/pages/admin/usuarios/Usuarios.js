import { Box } from "@mui/material";
import React, { useEffect } from "react";
import BasicTable from "../../../components/layout/BasicTable";
import useGetData from "../../../hooks/useGetData";

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
      id: "id2",
      header: "Informações",
      columns: [
        {
          accessorKey: "photoURL", //simple recommended way to define a column
          header: "Foto",
          Cell: ({ row }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                alt="avatar"
                height={30}
                src={row.original.photoURL}
                loading="lazy"
                style={{ borderRadius: "50%" }}
              />
            </Box>
          ),
        },
        {
          accessorKey: "displayName",
          header: "Nome",
        },
        {
          accessorKey: "sobrenome",
          header: "Sobrenome",
        },
        {
          accessorKey: "documento",
          header: "Documento",
        },
      ],
    },
    {
      id: "id3",
      header: "Contato",
      columns: [
        {
          accessorKey: "telefone",
          header: "Telefone",
        },
        {
          accessorKey: "email",
          header: "E-mail",
        },
      ],
    },
  ];

  return (
    <section>
      {/* <Container> */}
      {carregaUsuarios && <p>Carregando...</p>}
      {Object.keys(usuarios).length && (
        <BasicTable data={usuarios} columns={columns} />
      )}
      {/* </Container> */}
    </section>
  );
};

export default Usuarios;
