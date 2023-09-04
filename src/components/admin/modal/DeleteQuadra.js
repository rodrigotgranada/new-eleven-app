import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { db } from "../../../firebase";
import "./deleteQuadra.scss";

const DeleteQuadra = ({ isOpen, setIsOpen, quadra, id, closePrevious }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteItem = async () => {
    try {
      const docRef = doc(db, "quadras", id);
      await deleteDoc(docRef).then((e) => {
        setIsOpen(false);
        closePrevious(false);
        toast.success(`Quadra ${quadra?.name} excluida com sucesso!!`);
      });
    } catch (error) {
      toast.error(error.message);
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
      {quadra && (
        <>
          <ModalHeader className="d-block justify-content-between w-100">
            <div className="d-flex justify-content-between w-100">
              Deletar {quadra?.name} ??
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

export default DeleteQuadra;
