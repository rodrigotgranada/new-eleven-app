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
import "../../../styles/public/minhaMarcacaoModal.scss";
import ListPlayers2 from "../formComponents/ListPlayers2";
import TransferirMarcacao from "./TransferirMarcacao";
import CancelAgendamento from "./CancelAgendamento";
import moment from "moment";

const MinhaMarcacao = ({
  title,
  isOpen,
  setIsOpen,
  marcacao,
  horario,
  esporte,
  quadra,
}) => {
  const [modalTransfer, setModalTransfer] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const handleCLose = () => {
    setIsOpen(false);
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };
  // var dados = marcacao?.jogadores;

  return (
    <>
      {/* {console.log("marcacaoDados", dados)} */}
      <Modal
        size="lg"
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
        {marcacao && (
          <ModalBody>
            <Row>
              <Col lg="5">
                <h3>{`Agendamento`}</h3>
                <p>Data: {formataData(marcacao?.dataDia)}</p>
                <p>Hora: {`${horario?.value}:00`}</p>
                <p>Esporte: {esporte?.display}</p>
                <p>Quadra: {quadra?.name}</p>
              </Col>
              <Col lg="7">
                <h3>{`Jogadores`}</h3>
                <ListPlayers2 isOpen={isOpen} agendaID={marcacao?.id} />
              </Col>
            </Row>
          </ModalBody>
        )}

        <ModalFooter>
          {modalCancel && (
            <CancelAgendamento
              title={`Cancelamento...`}
              isOpen={modalCancel}
              setIsOpen={setModalCancel}
              agendaID={marcacao?.id}
              horaAgenda={`${horario?.value}:00`}
              transferID={marcacao?.transfer_id}
            />
          )}
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setModalCancel(!modalCancel);
            }}
          >
            Cancelar Agendamento
          </Button>
          {modalTransfer && (
            <TransferirMarcacao
              title={`Transferir marcação: ${marcacao?.codLocacao} para:`}
              isOpen={modalTransfer}
              setIsOpen={setModalTransfer}
              agendaID={marcacao?.id}
              codLocacao={marcacao?.codLocacao}
              transferID={marcacao?.transfer_id}
              marcacao={marcacao}
            />
          )}
          <Button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              setModalTransfer(!modalTransfer);
            }}
          >
            Transferir
          </Button>
          <Button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              handleCLose();
            }}
          >
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MinhaMarcacao;
