import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import CancelMarcacaoQuadra from "../../../modal/CancelMarcacaoQuadra";

const CancelMarcacao = (props) => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {ModalOpen && (
        <CancelMarcacaoQuadra
          title="Cancelar marcação"
          isOpen={ModalOpen}
          setIsOpen={setModalOpen}
          marcacao={props.marcacao}
          setMarcacao={props.setMarcacao}
          handleConfirm={props.handleConfirm}
        />
      )}
      <Button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          setModalOpen(!ModalOpen);
        }}
      >
        <GiCancel /> <span>Cancelar</span>
      </Button>
    </>
  );
};

export default CancelMarcacao;
