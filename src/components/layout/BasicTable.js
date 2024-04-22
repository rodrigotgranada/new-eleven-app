import { AccountCircle } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, ListItemIcon, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { useState } from "react";
import "../../styles/admin/userTable.scss";
import ReactSwitch from "react-switch";
import UsuarioApto from "./UsuarioApto";
import { useAuth } from "../../contexts/AuthContext";
import UsuarioAdmin from "./UsuarioAdmin";
import BtnExcluirUser from "../admin/modal/BtnExcluirUser";
import UsuarioBloq from "./UsuarioBloq";

const BasicTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [check, setCheck] = useState(true);
  const { currentUser, atualizaCheck } = useAuth();
  console.log("currentUser", currentUser);

  const handleUsuarioApto = async () => {};

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      // enableRowActions
      enableRowSelection={false}
      // enableColumnOrdering
      enableGlobalFilter={true}
      renderDetailPanel={({ row }) => (
        <Box className={"details"}>
          <Box className={`details-contet`}>
            {currentUser?.usuario?.owner && row.original.codAuth && (
              <>
                <p>Código de Verificação: {row.original.codAuth}</p>
              </>
            )}
            <p>
              Nome: {`${row.original.displayName} ${row?.original?.sobrenome}`}
            </p>
            <p>E-mail: {row?.original?.email}</p>
            {row.original.telefone ? (
              <p>Telefone: {row.original.telefone}</p>
            ) : (
              <></>
            )}
            {currentUser?.usuario?.owner && <p></p>}
            <div className={`row-infoUser`}>
              <p>Administrador: {row?.original?.rule ? "Sim" : "Não"}</p>
              {currentUser?.usuario?.owner && (
                <UsuarioAdmin infos={row?.original} />
              )}
            </div>

            <div className={`row-infoUser`}>
              <p>Usuario apto: {row.original.checked ? "Sim" : "Não"}</p>
              {currentUser?.usuario?.owner && (
                <UsuarioApto infos={row?.original} />
              )}
            </div>
            <div className={`row-infoUser`}>
              <p>Usuario bloqueado: {row.original.status ? "Não" : "Sim"}</p>
              {currentUser?.usuario?.owner && (
                <UsuarioBloq infos={row?.original} />
              )}
            </div>

            {currentUser?.usuario?.owner && (
              <p>Acesso máximo: {row.original.owner ? "Sim" : "Não"}</p>
            )}
          </Box>
        </Box>
      )}
      localization={MRT_Localization_PT_BR}
    />
  );
};

export default BasicTable;
