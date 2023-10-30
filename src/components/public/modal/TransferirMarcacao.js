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
import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
// import ReactSwitch from "react-switch";
// import Switch from "react-switch";

const TransferirMarcacao = ({
  title,
  isOpen,
  setIsOpen,
  agendaID,
  codLocacao,
}) => {
  // const {
  //   getData: getUsuarios,
  //   data: usuarios,
  //   loading: carregaUsuarios,
  // } = useGetData();
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

  // let jogador = false;

  const handleVerify = async () => {
    const ver = await checkTransfer(codLocacao);
    // console.log(ver);
    if (ver?.error) {
      // console.log(ver);
      setErrorSolicitacao(ver);
    } else {
      setErrorSolicitacao(null);
    }
  };

  useEffect(() => {
    console.log(jogador);
  }, [jogador]);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleSelectPlayer = async (e) => {
    console.log("jogador escolhido", e);
    setSelectPlayer(e);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = async (event, indice) => {
    const { value, name } = event.target;
    // console.log("value", currentUser);
    let verify = onlyNumbers(value).length;
    setSelectPlayer(null);
    if (verify === 11) {
      const jog = await getDataWhere(
        "users",
        "telefone",
        "==",
        `${onlyNumbers(value)}`
      );
      console.log("jog", jog);
      if (jog && jog?.uid != currentUser?.uid) {
        setSelectPlayer(jog);
      } else {
        setSelectPlayer({ error: "Número inválido" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("evento", e);
    const verify = await checkTransfer(codLocacao);

    console.log(verify);

    if (!verify.error) {
      const verify2 = await createTransfer(
        codLocacao,
        currentUser,
        selectPlayer,
        jogador
      );
      console.log(verify2);
      handleVerify();
      // setErrorSolicitacao(null);
    } else {
      setErrorSolicitacao(verify);
    }
    // const { value } = e.target;
    // console.log("valor", value);
  };

  const handleCancel = async () => {
    const verify = await cancelTransfer(codLocacao);
    console.log(verify);
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
                {/* {loadAuth && <p> Carregando... </p>} */}
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
