import React, { useState } from "react";
import ReactSwitch from "react-switch";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const UsuarioAdmin = ({ infos }) => {
  console.log("infos", infos);
  const [check, setCheck] = useState(infos?.rule);
  const { currentUser, atualizaAdmin } = useAuth();

  const handleChangeUserCheck = async () => {
    console.log("entrei");
    console.log("currentUser", currentUser);

    const retorno = await atualizaAdmin(infos.uid, !infos.rule);
    console.log(retorno);
    if (retorno) {
      toast.success("Usuario atualizado com sucesso!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.error("Usuario não atualizado! Tente novamente mais tarde", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  return (
    <>
      <ReactSwitch
        onChange={() => handleChangeUserCheck()}
        checked={infos?.rule}
      />
    </>
  );
};

export default UsuarioAdmin;
