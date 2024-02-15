import React, { useState } from "react";
import AddPermanente from "./modal/AddPermanente";

const ListPermanentes = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const handleAddPermanente = () => {
    console.log("Adicionar Permanente");
  };
  return (
    <>
      {ModalOpen && (
        <AddPermanente
          title={`Adicionar permanente`}
          isOpen={ModalOpen}
          setIsOpen={setModalOpen}
          // tipoQuadra={id}
        />
      )}
      <section className="buttons-permanente">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Adicionar Permanente
        </button>
      </section>

      <section className="body-permanente"></section>

      <section className="buttons-permanente">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Adicionar Permanente
        </button>
      </section>
    </>
  );
};

export default ListPermanentes;
