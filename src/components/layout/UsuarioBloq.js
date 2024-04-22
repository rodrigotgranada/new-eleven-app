import React, { useState } from "react";
import ReactSwitch from "react-switch";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const UsuarioBloq = ({ infos }) => {
  // console.log("infos", infos);
  const [check, setCheck] = useState(infos?.status);
  const { currentUser, atualizaStatus } = useAuth();

  const handleChangeUserCheck = async () => {
    const retorno = await atualizaStatus(infos.uid, !infos.status);
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
        checked={!infos?.status}
      />
    </>
  );
};

export default UsuarioBloq;
