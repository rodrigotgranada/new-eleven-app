import React, { useEffect } from "react";
import {
  Form,
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import Select from "react-select";
import MaskedInputCelModal from "../formComponents/MaskedInputCelModal";
import useGetData from "../../../hooks/useGetData";
import Loading from "../Loading/Loading";
import { useState } from "react";
import useAuthData from "../../../hooks/useAuthData";
import { useAuth } from "../../../contexts/AuthContext";
import useTransferAgendamento from "../../../hooks/useTransferAgendamento";
import { Switch } from "@mui/material";

const TransferirMarcacao = ({
  title,
  isOpen,
  setIsOpen,
  agendaID,
  codLocacao,
  transferID,
  marcacao,
}) => {
  const { currentUser, logout } = useAuth();

  const [selectPlayer, setSelectPlayer] = useState(null);
  const [errorSolicitacao, setErrorSolicitacao] = useState(null);
  const { loading: loadAuth, getDataWhere } = useAuthData();
  const {
    loading: loadTransfer,
    checkTransfer,
    createTransfer,
    cancelTransfer,
  } = useTransferAgendamento();
  const [jogador, setJogador] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleVerify();
    }
  }, [isOpen]);

  const handleVerify = async (verifyID) => {
    if (transferID || verifyID) {
      const ver = await checkTransfer(transferID || verifyID);
      if (ver?.error) {
        setErrorSolicitacao(ver);
      } else {
        setErrorSolicitacao(null);
      }
    } else {
      setErrorSolicitacao(null);
    }
  };

  const handleCLose = () => {
    setIsOpen(false);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = async (event, indice) => {
    const { value, name } = event.target;
    let verify = onlyNumbers(value).length;
    setSelectPlayer(null);
    if (verify === 11) {
      const jog = await getDataWhere(
        "users",
        "telefone",
        "==",
        `${onlyNumbers(value)}`
      );
      if (jog && jog?.uid != currentUser?.uid) {
        setSelectPlayer(jog);
      } else {
        setSelectPlayer({ error: "Número inválido" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transferID) {
      const verify = await checkTransfer(transferID);
      console.log(verify);
      if (!verify.error) {
        const verify2 = await createTransfer(
          codLocacao,
          currentUser,
          selectPlayer,
          agendaID,
          jogador,
          marcacao
        );
        handleVerify();
      } else {
        setErrorSolicitacao(verify);
      }
    } else {
      const verify2 = await createTransfer(
        codLocacao,
        currentUser,
        selectPlayer,
        agendaID,
        jogador,
        marcacao
      );
      handleVerify(verify2);
    }
  };

  const handleCancel = async () => {
    const verify = await cancelTransfer(transferID);
    handleVerify();
  };

  return (
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
      <Form onSubmit={handleSubmit} className="form_jogaores_modal">
        <ModalBody>
          <Row>
            <Col lg="12">
              <FormGroup className="form__group_modal">
                <MaskedInputCelModal
                  unique={agendaID}
                  type="telefone"
                  name="telefone"
                  placeholder={`Telefone`}
                  handleChange2={handleChange}
                  required={true}
                  classX="form-control"
                  desabilitado={errorSolicitacao?.error ? true : false}
                />
              </FormGroup>
              {!errorSolicitacao?.error && (
                <Row className="btns-save-modal-transfer">
                  <FormGroup>
                    <Label>Com Jogador:</Label>
                    <Switch
                      color="primary"
                      checked={jogador}
                      onChange={() => {
                        setJogador(!jogador);
                      }}
                    />
                  </FormGroup>
                </Row>
              )}

              <Row className="btns-save-modal-transfer">
                {errorSolicitacao?.error && (
                  <p>
                    {errorSolicitacao?.error} - Código de transferencia:
                    {errorSolicitacao?.data?.code} telefone:{" "}
                    {errorSolicitacao?.data?.telefone}
                  </p>
                )}
              </Row>
              <Row className="btns-save-modal-transfer">
                {errorSolicitacao?.error ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleCancel();

                      // handleCLose();
                    }}
                  >
                    Cancelar Transferencia
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={selectPlayer?.displayName ? false : true}
                  >
                    Transferir
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    handleCLose();
                  }}
                >
                  Fechar
                </button>
              </Row>
            </Col>
          </Row>
        </ModalBody>
      </Form>

      {/* <ModalFooter>
        <Button
          type="submit"
          className="btn btn-success"
          disabled={selectPlayer?.displayName ? false : true}
          // onClick={() => {
          //   handleCLose();
          // }}
        >
          Transferir
        </Button>
        <Button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            handleCLose();
          }}
        >
          Cancelar
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default TransferirMarcacao;
