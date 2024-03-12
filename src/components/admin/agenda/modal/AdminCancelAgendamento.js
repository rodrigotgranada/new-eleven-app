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

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useGetData from "../../../../hooks/useGetData";
import useTransferAgendamento from "../../../../hooks/useTransferAgendamento";
import { db } from "../../../../firebase";
import useLogs from "../../../../hooks/useLogs";
import { useAuth } from "../../../../contexts/AuthContext";

const AdminCancelAgendamento = ({
  title,
  agendamentoOpen,
  setAgendamentoOpen,
  isOpen,
  setIsOpen,
  agendaID,
  horaAgenda,
  transferID,
}) => {
  const [agenda, setAgenda] = useState(null);
  const [transfer, setTransfer] = useState(null);
  const [isValidCancel, setIsValidCancel] = useState(true);
  const {
    getDataId: getItemId,
    data: marcX,
    loading: carregaAgendamento,
  } = useGetData();

  const { checkTransfer } = useTransferAgendamento();
  const { logAgedamento, logAgendamentoDatabase } = useLogs();
  const { currentUser } = useAuth();
  // console.log("ID", agendaID);

  useEffect(() => {
    if (!isOpen) {
      setAgenda(null);
    } else {
      handleVerifyAgenda();
    }
    return () => {
      setAgenda(null);
    };
  }, [isOpen]);

  const handleVerifyAgenda = async () => {
    const agendamento = await getItemId("agenda", agendaID);
    console.log("agendamento", agendamento);
    setAgenda(agendamento);

    if (agendamento) {
      if (agendamento?.transfer_id) {
        const vTransfer = await checkTransfer(agendamento?.transfer_id);
        setTransfer(vTransfer?.error);
      }
    }
  };

  const navigate = useNavigate();
  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirmar = async () => {
    try {
      const docRef = doc(db, "agenda", agendaID);
      await updateDoc(docRef, {
        user: "agendamentoCancelado",
        // dataDia: "2022-01-01",
      }).then(async (e) => {
        try {
          const docRef = doc(db, "agenda", agendaID);
          await deleteDoc(docRef).then((e) => {
            toast.success(`Agendamento Cancelado!!`);
            logAgendamentoDatabase(
              "interno",
              "quadra",
              "remove",
              agenda,
              currentUser
            );
            setIsOpen(false);
            setAgendamentoOpen(false);
          });
        } catch (error) {
          toast.error(error.message);
        }
      });
    } catch (error) {
      toast.error(error.message);
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
              <>
                <p>
                  {agenda &&
                    `Deseja cancelar o agendamento ${agenda.codLocacao} ?`}
                </p>
                {transfer && (
                  <p>
                    Existe uma transferencia para esse agendamento, cancelar
                    mesmo assim?
                  </p>
                )}
              </>
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

export default AdminCancelAgendamento;
