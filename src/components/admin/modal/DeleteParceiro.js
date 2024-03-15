import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { db } from "../../../firebase";
import "./deleteQuadra.scss";

const DeleteParceiro = ({
  isOpen,
  setIsOpen,
  oldIsOpen,
  oldSetIsOpen,
  parceiro,
}) => {
  console.log(isOpen, parceiro);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteItem = async () => {
    try {
      const docRef = doc(db, "parceiros", parceiro.id);
      console.log("docRef", docRef);
      await deleteDoc(docRef).then((e) => {
        oldSetIsOpen(!oldIsOpen);
        setIsOpen(!isOpen);
        toast.success(`Parceiro ${parceiro?.nome} excluido com sucesso!!`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      {parceiro && (
        <>
          <ModalHeader className="d-block justify-content-between w-100">
            <div className="d-flex justify-content-between w-100">
              Deletar {parceiro?.nome} ??
              <div>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  x
                </span>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="12">
                <div className="delete-buttons">
                  <Button
                    className="btn btn-success delete-btn"
                    type="button"
                    onClick={handleDeleteItem}
                  >
                    {" "}
                    Sim{" "}
                  </Button>

                  <Button
                    className="btn btn-danger delete-btn"
                    type="button"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    {" "}
                    Não{" "}
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </>
      )}
    </Modal>
  );
};

export default DeleteParceiro;
