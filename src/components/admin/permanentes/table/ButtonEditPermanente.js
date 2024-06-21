import React, { useEffect, useState } from "react";
import AddPermanente from "../modal/AddPermanente";
import ConfirmExcluirPermanente from "../modal/ConfirmExcluirPermanente";
import ConfirmRenovarPermanente from "../modal/ConfirmRenovarPermanente";

const ButtonEditPermanente = ({ data }) => {
  
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  
  useEffect(() => {
    
    return () => { }
  }, [data])
  

  return (
    <>
      {modalEditOpen && (
        <ConfirmRenovarPermanente
          data={data}
          isOpen={modalEditOpen}
          setIsOpen={setModalEditOpen}
        />
      )}
      <button
        className="btn btn-warning"
        onClick={() => {
          setModalEditOpen(!modalEditOpen);
        }}
      >
        Renovar
      </button>
      {modalExcluirOpen && (
        <ConfirmExcluirPermanente
          data={data}
          isOpen={modalExcluirOpen}
          setIsOpen={setModalExcluirOpen}
        />
      )}
      <button
        className="btn btn-danger"
        onClick={() => {
          setModalExcluirOpen(!modalExcluirOpen);
        }}
      >
        Excluir
      </button>
    </>
  );
};

export default ButtonEditPermanente;
