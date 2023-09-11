import { AccountCircle } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, ListItemIcon, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { useState } from "react";
import "../../styles/admin/userTable.scss";

const BasicTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      // enableRowSelection={false}
      // enableColumnOrdering
      enableGlobalFilter={true}
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img
            alt="avatar"
            width={200}
            height={200}
            src={row.original.photoURL}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <p>E-mail verificado: {row.original.checked ? "Sim" : "Não"}</p>
            <p>Administrador: {row.original.rule ? "Sim" : "Não"}</p>
            <p>Acesso máximo: {row.original.owner ? "Sim" : "Não"}</p>
          </Box>
        </Box>
      )}
      renderRowActionMenuItems={({ closeMenu, row }) => {
        const body = [
          <MenuItem
            key={0}
            onClick={() => {
              // View profile logic...
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            Ver Perfil {row.original.displayName}
          </MenuItem>,
        ];

        row.original.telefone &&
          body.push(
            <MenuItem
              key={1}
              onClick={() => {
                // Send email logic...
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <WhatsAppIcon />
              </ListItemIcon>
              Enviar Whatsapp
            </MenuItem>
          );

        return body;
      }}
      localization={MRT_Localization_PT_BR}
    />
  );
};

export default BasicTable;
