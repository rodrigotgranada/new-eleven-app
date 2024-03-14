import { useScrollTrigger } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
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
import useGetData from "../../../hooks/useGetData";
import useTransferAgendamento from "../../../hooks/useTransferAgendamento";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import useLogs from "../../../hooks/useLogs";
import { useAuth } from "../../../contexts/AuthContext";

const CancelAgendamento = ({
  title,
  isOpen,
  setIsOpen,
  agendaID,
  agendaMarc,
  horaAgenda,
  transferID,
}) => {
  const [agenda, setAgenda] = useState(null);
  const [transfer, setTransfer] = useState(null);
  const [isValidCancel, setIsValidCancel] = useState(true);
  const { logAgedamento, logAgendamentoDatabase } = useLogs();
  const { currentUser } = useAuth();

  const {
    getDataId: getItemId,
    data: marcX,
    loading: carregaAgendamento,
  } = useGetData();

  const { checkTransfer } = useTransferAgendamento();
  // console.log("ID", agendaID);

  useEffect(() => {
    if (!isOpen) {
      setAgenda(null);
    } else {
      handleVerifyAgenda();
    }
  }, [isOpen]);

  const handleVerifyAgenda = async () => {
    const agendamento = await getItemId("agenda", agendaID);
    console.log("agendamento", agendamento);
    setAgenda(agendamento);

    if (agendamento) {
      const currentTime = moment();
      const isWithinRange = isTimeValid(
        currentTime,
        agendamento.dataDia,
        horaAgenda
      );
      setIsValidCancel(isWithinRange);
      if (agendamento?.transfer_id) {
        const vTransfer = await checkTransfer(agendamento?.transfer_id);
        console.log("vT", vTransfer);
        setTransfer(vTransfer?.error);
      }
    }
  };

  const isTimeValid = (currentTime, dayTime, hourTime) => {
    console.log(currentTime, dayTime, hourTime);
    const horaMarcada = moment(`${dayTime} ${hourTime}`, "YYYY-MM-DD HH:mm");
    const horaValida = moment(
      `${dayTime} ${hourTime}`,
      "YYYY-MM-DD HH:mm"
    ).subtract(24, "hours");

    const validade = moment(horaValida, "DD/MM/YYYY HH:mm");
    // console.log("validade", validade);

    const isValid = currentTime.isSameOrBefore(validade); // true
    // console.log("AindaPodeCancelar?", isValid);
    return isValid;
  };

  const navigate = useNavigate();
  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirmar = async () => {
    navigate("/");
    setIsOpen(false);

    try {
      const docRef = doc(db, "agenda", agendaID);
      await updateDoc(docRef, {
        user: "agendamentoCancelado",
        // dataDia: "2022-01-01",
      }).then(async (e) => {
        try {
          const docRef = doc(db, "agenda", agendaID);
          await deleteDoc(docRef).then((e) => {
            logAgendamentoDatabase(
              "app",
              "quadra",
              "remove",
              agenda,
              currentUser
            );
            toast.success(`Agendamento Cancelado!!`, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          });
        } catch (error) {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    // toast.error(`Agendamento ${agendaID} cancelado`, {
    //   position: toast.POSITION.BOTTOM_CENTER,
    // });
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
              {isValidCancel ? (
                <>
                  <p>{`Deseja cancelar o agendamento ${agendaMarc.codLocacao} ?`}</p>
                  {transfer && (
                    <p>
                      Existe uma transferencia para esse agendamento, cancelar
                      mesmo assim?
                    </p>
                  )}
                </>
              ) : (
                <p>
                  Não pode cancelar agendamento com menos de 24 horas de
                  antecedencia, contate um administrador!!
                </p>
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {isValidCancel && (
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleConfirmar();
              }}
            >
              Sim
            </Button>
          )}
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleCLose();
            }}
          >
            {isValidCancel ? "Não" : "Sair"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CancelAgendamento;
