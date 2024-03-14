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
import { useAuth } from "../../../contexts/AuthContext";
import useTransferAgendamento from "../../../hooks/useTransferAgendamento";
import CancelAgendamento from "./CancelAgendamento";

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
  const { currentUser } = useAuth();
  const { checkTransfer, cancelTransfer, acceptTransfer } =
    useTransferAgendamento();
  const [modalCancel, setModalCancel] = useState(false);
  console.log("transferencia", transferencia, "agendamento", agendamento);

  const playerPadrao = {
    name: currentUser?.usuario?.displayName,
    id: currentUser?.usuario?.uid,
    telefone: currentUser?.usuario?.telefone,
    pago: false,
  };

  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleCancel = async () => {
    const verify = await cancelTransfer(transferencia?.id);
    console.log("AQUI", verify);
    handleVerify();
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };

  const handleVerify = async (codigo) => {
    const codeAuth = transferencia.code;
    // console.log("codigo usuario", parseInt(codeAuth));
    // console.log("codigo digitado", parseInt(codigo));
    if (codigo) {
      if (parseInt(codigo) === parseInt(codeAuth)) {
        const valida = await checkTransfer(transferencia.id);
        console.log("VALIDA", valida);
        if (valida?.error) {
          const accepted = await acceptTransfer(transferencia);
          toast.success("Código Válido", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error("Transferencia Cancelada", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else {
        toast.error("Código inválido", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
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
                <p>Data: {formataData(agendamento?.dataDia)}</p>
                <p>Hora: {`${horario?.value}:00`}</p>
                <p>Esporte: {esporte?.display}</p>
                <p>Quadra: {quadra?.name}</p>
              </Col>

              {console.log(transferencia?.jogadores)}
              {transferencia?.jogadores && (
                <Col lg="3">
                  <h4>{`Jogadores`}</h4>
                  {agendamento &&
                    agendamento?.jogadores.map((jogador, index) => {
                      return <p key={index}>{jogador.name}</p>;
                    })}
                </Col>
              )}
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
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancelar Transferencia
          </Button>
          {/* {modalTransfer && (
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
