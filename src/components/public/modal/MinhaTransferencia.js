import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import ListPlayers2 from "../formComponents/ListPlayers2";
import VerificationInput from "react-verification-input";
import { BiTennisBall } from "react-icons/bi";

const MinhaTransferencia = ({
  title,
  isOpen,
  setIsOpen,
  transferencia,
  agendamento,
  horario,
  esporte,
  quadra,
}) => {
  console.log("transferencia", transferencia, "agendamento", agendamento);
  const handleCLose = () => {
    setIsOpen(false);
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };

  const handleVerify = async (codigo) => {
    // console.log("current", codeVerify);
    // const userCode = await getDataId("users", user.uid);
    const codeAuth = transferencia.code;
    console.log("codigo usuario", parseInt(codeAuth));
    console.log("codigo digitado", parseInt(codigo));

    if (parseInt(codigo) === parseInt(codeAuth)) {
      console.log("codigo valido");
    } else {
      console.log("codigo invalido");
    }
  };
  return (
    <>
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
        {transferencia && (
          <ModalBody>
            <Row>
              <Col lg="5">
                <h3>{`Dados agendamento`}</h3>
                <p>Data: {formataData(transferencia?.dataDia)}</p>
                <p>Hora: {`${horario?.value}:00`}</p>
                <p>Esporte: {esporte?.display}</p>
                <p>Quadra: {quadra?.name}</p>
              </Col>
              <Col lg="3">
                {console.log(transferencia?.jogadores)}
                {transferencia?.jogadores == false && (
                  <>
                    <h4>{`Jogadores`}</h4>
                    {agendamento &&
                      agendamento?.jogadores.map((jogador, index) => {
                        return <p key={index}>{jogador.name}</p>;
                      })}
                    {/* <ListPlayers2
                      isOpen={isOpen}
                      agendaID={transferencia?.locacaoID}
                    /> */}
                  </>
                )}
              </Col>
              <Col lg="3">
                <h4>{`Código transferencia`}</h4>
                <VerificationInput
                  onComplete={(e) => handleVerify(e)}
                  length={6}
                  validChars="0-9"
                  removeDefaultStyles
                  placeholder={<BiTennisBall />}
                  classNames={{
                    container: "container-confirm",
                    characters: "characters-confirm",
                    character: "character-confirm",
                    characterInactive: "character--inactive-confirm",
                    characterSelected: "character--selected-confirm",
                  }}
                />
              </Col>
            </Row>
          </ModalBody>
        )}

        <ModalFooter>
          {/* {modalCancel && (
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
          </Button> */}
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

export default MinhaTransferencia;
