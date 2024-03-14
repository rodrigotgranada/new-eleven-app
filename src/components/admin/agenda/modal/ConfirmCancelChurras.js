import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import useLogs from "../../../../hooks/useLogs";
import { useAuth } from "../../../../contexts/AuthContext";

const ConfirmCancelChurras = ({ isOpen, setIsOpen, infos }) => {
  const { logAgedamento, logAgendamentoDatabase } = useLogs();
  const { currentUser } = useAuth();
  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirmar = async () => {
    try {
      const docRef = doc(db, "agenda_churras", infos?.config?.id);
      await deleteDoc(docRef).then((e) => {
        toast.success(`Agendamento Churrasqueira Cancelado!!`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        logAgendamentoDatabase(
          "interno",
          "churras",
          "remove",
          infos.config,
          currentUser
        );
        setIsOpen(false);
        // setAgendamentoOpen(false);
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  return (
    <Modal
      size={"md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      <ModalHeader className="d-block justify-content-between w-100">
        <div className="d-flex justify-content-between w-100">
          {`Confirmar desmarcar churrasqueira de ${
            infos?.user.displayName || infos?.config?.user?.nome
          } ${infos?.user.sobrenome || ""}`}
          <div>
            <span
              className="cursor-pointer"
              onClick={() => {
                handleCLose();
              }}
            >
              x
            </span>
          </div>
        </div>
      </ModalHeader>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleConfirmar()}
        >
          Sim
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleCLose()}
        >
          Não
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmCancelChurras;
