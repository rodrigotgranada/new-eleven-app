import React, { useState } from "react";
import EditChurrasqueira from "../modal/EditChurrasqueira";

const ButtonName = ({ churrasqueira }) => {
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      {modalEdit && (
        <EditChurrasqueira
          isOpen={modalEdit}
          setIsOpen={setModalEdit}
          churrasqueiraX={churrasqueira}
        />
      )}
      <span onClick={() => setModalEdit(!modalEdit)}>
        {churrasqueira.numero} ({churrasqueira.nome}){" "}
      </span>
    </>
  );
};

export default ButtonName;
