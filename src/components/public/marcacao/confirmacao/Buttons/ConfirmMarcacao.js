import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GiConfirmed } from "react-icons/gi";
import ConfirmMarcacaoQuadra from "../../../modal/ConfirmMarcacaoQuadra";

const ConfirmMarcacao = ({ marcacao, setMarcacao, usuario, handleConfirm }) => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {ModalOpen && (
        <ConfirmMarcacaoQuadra
          title="Comprovante de Marcação"
          isOpen={ModalOpen}
          setIsOpen={setModalOpen}
          marcacao={marcacao}
          setMarcacao={setMarcacao}
          usuario={usuario}
          handleConfirm={handleConfirm}
        />
      )}
      <Button
        className="btn btn-success"
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <GiConfirmed /> <span>Confirmar</span>
      </Button>
    </>
  );
};

export default ConfirmMarcacao;
