import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { db } from "../../../firebase";

const ConfirmMarcacaoQuadra = ({
  title,
  isOpen,
  setIsOpen,
  marcacao,
  setMarcacao,
  handleConfirm,
  ...props
}) => {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    if (isOpen) {
      addMarcacao(marcacao);
    }
  }, [isOpen]);

  const navigate = useNavigate();

  const addMarcacao = async (dados) => {
    try {
      const docRef = collection(db, "agenda");
      await addDoc(docRef, dados).then((e) => {
        setConfirmed(true);
        toast.success(`Marcação ${dados?.codLocacao} confirmada`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCLose = () => {
    if (!confirmed) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
      navigate("/meus-agendamentos");
    }
  };
  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}
        className="responsive-modal"
      >
        <ModalHeader className="d-block justify-content-between w-100">
          <div className="d-flex justify-content-between w-100">
            {title ? title : ""}
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

        <ModalBody>
          <Row>
            <Col lg="12">
              <p>{`Marcação ${marcacao?.codLocacao} confirmada`}</p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleCLose();
            }}
          >
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmMarcacaoQuadra;
