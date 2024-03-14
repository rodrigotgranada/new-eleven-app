import React, { useState } from "react";
import ReactSwitch from "react-switch";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const UsuarioApto = ({ infos }) => {
  console.log("infos", infos);
  const [check, setCheck] = useState(infos?.checked);
  const { currentUser, atualizaCheck } = useAuth();

  const handleChangeUserCheck = async () => {
    console.log("entrei");
    console.log("currentUser", currentUser);

    const retorno = await atualizaCheck(infos.uid, !infos.checked);
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
        checked={infos?.checked}
      />
    </>
  );
};

export default UsuarioApto;
