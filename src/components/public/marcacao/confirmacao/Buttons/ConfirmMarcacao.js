import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GiConfirmed } from "react-icons/gi";
import ConfirmMarcacaoQuadra from "../../../modal/ConfirmMarcacaoQuadra";

const ConfirmMarcacao = (props) => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <ConfirmMarcacaoQuadra
        title="Comprovante de Marcação"
        isOpen={ModalOpen}
        setIsOpen={setModalOpen}
        marcacao={props.marcacao}
        setMarcacao={props.setMarcacao}
        handleConfirm={props.handleConfirm}
      />
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
