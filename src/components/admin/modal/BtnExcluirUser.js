import React, { useState } from "react";
import DeleteExcluirUser from "./DeleteExcluirUser";

const BtnExcluirUser = ({ usuario }) => {
  const [modaldelete, setModalDelete] = useState(false);
  return (
    <>
      {modaldelete && (
        <DeleteExcluirUser
          isOpen={modaldelete}
          setIsOpen={setModalDelete}
          parceiro={usuario}
        />
      )}
      <button
        className="btn btn-danger"
        onClick={() => setModalDelete(!modaldelete)}
      >
        Excluir
      </button>
    </>
  );
};

export default BtnExcluirUser;
