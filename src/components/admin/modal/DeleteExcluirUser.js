import { doc } from "firebase/firestore";

import React from "react";
import { toast } from "react-toastify";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { db } from "../../../firebase";
import "./deleteQuadra.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { deleteUser, getAuth } from "firebase/auth";

const DeleteExcluirUser = ({ isOpen, setIsOpen, parceiro }) => {
  const { currentUser, atualizaCheck } = useAuth();
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteItem = async () => {
    try {
      console.log(parceiro);
      const retorno = await atualizaCheck(parceiro.uid, !parceiro.checked);
      console.log(retorno);
      if (retorno) {
        try {
          const docRef = doc(db, "users", parceiro.id);
          console.log("docRef", docRef);
          const auth = getAuth();
          console.log("users", auth);
          // await deleteDoc(docRef)
          //   .then((e) => {
          //     setIsOpen(!isOpen);
          //     toast.success(
          //       `Usuario ${parceiro?.nome} excluido com sucesso!!`,
          //       {
          //         position: toast.POSITION.BOTTOM_CENTER,
          //       }
          //     );
          //   })
          //   .then((e) => {
          //     console.log("E", e);
          //   });
        } catch (err) {
          toast.error("Usuario não atualizado! Tente novamente mais tarde", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else {
        toast.error("Usuario não atualizado! Tente novamente mais tarde", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
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
              Deletar {parceiro?.displayName} ??
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

export default DeleteExcluirUser;
