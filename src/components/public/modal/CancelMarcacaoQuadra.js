import React from "react";
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

const CancelMarcacaoQuadra = ({
  title,
  isOpen,
  setIsOpen,
  marcacao,
  setMarcacao,
  handleConfirm,
  ...props
}) => {
  console.log(marcacao);

  const navigate = useNavigate();
  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirmar = () => {
    navigate("/");
    setIsOpen(false);

    toast.error(`Marcação cancelada`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
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
              <p>{`Deseja cancelar o agendamento ?`}</p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleConfirmar();
            }}
          >
            Sim
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleCLose();
            }}
          >
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CancelMarcacaoQuadra;
