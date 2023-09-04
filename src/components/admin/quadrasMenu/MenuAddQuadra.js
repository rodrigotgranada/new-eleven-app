import React, { useState } from "react";
import AddQuadra from "../modal/AddQuadra";

const MenuAddQuadra = ({ chave, type, display, id, ...props }) => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <AddQuadra
        title={`Adicionar quadra ${display}`}
        isOpen={ModalOpen}
        setIsOpen={setModalOpen}
        tipoQuadra={id}
      />
      <button className="btn btn-warning" onClick={() => setModalOpen(true)}>
        Adicionar Quadra {display}
      </button>
    </>
  );
};

export default MenuAddQuadra;
