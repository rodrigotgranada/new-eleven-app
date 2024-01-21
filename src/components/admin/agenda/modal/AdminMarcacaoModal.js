import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import ListPlayers2 from "../../../public/formComponents/ListPlayers2";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import CancelAgendamento from "../../../public/modal/CancelAgendamento";
import TransferirMarcacao from "../../../public/modal/TransferirMarcacao";
import AdminCancelAgendamento from "./AdminCancelAgendamento";
import AdminListPlayers from "../formComponents/AdminListPlayers";
import AdminNewMarcacao from "../formComponents/AdminNewMarcacao";
import AdminTransferAgendamento from "./AdminTransferAgendamento";
import AdminConfirmBloqueio from "./AdminConfirmBloqueio";
import AdminConfirmDesbloqueio from "./AdminConfirmDesbloqueio";

const AdminMarcacaoModal = ({ title, isOpen, setIsOpen, data, ...props }) => {
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();
  const [modalTransfer, setModalTransfer] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [modalBloquear, setModalBloquear] = useState(false);
  const [modalDesbloquear, setModalDesbloquear] = useState(false);
  useEffect(() => {
    if (isOpen) {
      console.log("DATAMODAL", data);
      if (!data.new) {
        getHorario("horarios", data?.dataHorario);
        getEsporte("modalidades", data?.esporte);
        getQuadra("quadras", data?.quadra);
      }
    }
  }, [isOpen]);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };

  const bodyNew = (
    <>
      <AdminNewMarcacao
        dados={data}
        oldOpen={isOpen}
        oldSetIsOpen={setIsOpen}
        handleC={handleCLose}
      />
    </>
  );
  const bodyEdit = (
    <>
      {loadingEsporte && loadingHorario && loadingQuadra && (
        <Loading type={`spin`} width={"30px"} />
      )}
      <Row>
        <Col lg="5">
          <h3>{`Agendamento`}</h3>
          <p>Data: {formataData(data?.dataDia)}</p>
          <p>Hora: {`${hora?.value}:00`}</p>
          {!data.bloqueio && <p>Esporte: {esporte?.display}</p>}
          <p>Quadra: {quadra?.name}</p>
        </Col>
        <Col lg="7">
          {!data.bloqueio && (
            <>
              <h3>{`Jogadores`}</h3>
              <AdminListPlayers isOpen={isOpen} agendaID={data?.id} />
            </>
          )}
        </Col>
      </Row>{" "}
    </>
  );

  const buttonsEdit = (
    <>
      {loadingEsporte && loadingHorario && loadingQuadra && (
        <Loading type={`spin`} width={"30px"} />
      )}
      {modalCancel && (
        <AdminCancelAgendamento
          title={`Cancelamento...`}
          agendamentoOpen={isOpen}
          setAgendamentoOpen={setIsOpen}
          isOpen={modalCancel}
          setIsOpen={setModalCancel}
          agendaID={data?.id}
          horaAgenda={`${hora?.value}:00`}
          transferID={data?.transfer_id}
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
        <AdminTransferAgendamento
          title={`Transferir marcação: ${data?.codLocacao} para:`}
          isOpen={modalTransfer}
          setIsOpen={setModalTransfer}
          dados={data}
          // codLocacao={data?.codLocacao}
          // transferID={data?.transfer_id}
          // marcacao={data}
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
    </>
  );

  const buttonsBloqueio = (
    <>
      {modalDesbloquear && (
        <AdminConfirmDesbloqueio
          isOpen={modalDesbloquear}
          setIsOpen={setModalDesbloquear}
          oldOpen={isOpen}
          oldSetIsOpen={setIsOpen}
          title={`Desbloquear quadra X`}
          dados={data}
        />
      )}
      <Button
        type="button"
        className="btn btn-success"
        onClick={() => {
          // handleCLose();
          setModalDesbloquear(!modalDesbloquear);
        }}
      >
        Desbloquear
      </Button>
    </>
  );

  return (
    <Modal
      size={data.bloqueio ? "sm" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      <ModalHeader className="d-block justify-content-between w-100">
        <div className="d-flex justify-content-between w-100">
          {title}
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
      {data?.new ? (
        bodyNew
      ) : (
        <>
          <ModalBody>{bodyEdit}</ModalBody>
          <ModalFooter>
            {data.bloqueio ? buttonsBloqueio : buttonsEdit}
            <Button
              type="button"
              onClick={() => {
                handleCLose();
              }}
            >
              Fechar
            </Button>
          </ModalFooter>
        </>
      )}
      {/* {data?.new ? bodyNew : bodyEdit} */}
    </Modal>
  );
};

export default AdminMarcacaoModal;
