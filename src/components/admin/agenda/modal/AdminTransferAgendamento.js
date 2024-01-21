import React, { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Creatable, { useCreatable } from "react-select/creatable";
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
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import { useState } from "react";
import { Switch } from "@mui/material";
import useTransferAgendamento from "../../../../hooks/useTransferAgendamento";
import { toast } from "react-toastify";

const AdminTransferAgendamento = ({ title, isOpen, setIsOpen, dados }) => {
  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();
  const [jogador, setJogador] = useState(false);
  const [selectjogador, setSelectJogador] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    getUsers("users");
    return () => {};
  }, []);

  console.log("agendaID", dados);
  const animatedComponents = makeAnimated();
  const handleGetUser = async (e) => {
    console.log("dados", dados);
    console.log(e);
    setSelectJogador(e);
  };

  const handleCLose = () => {
    setIsOpen(false);
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
          {loadingUsers && <Loading type={`spin`} width={"30px"} />}
          {users && (
            <>
              <FormGroup className="form__group">
                <Label>Usuários</Label>
                <Select
                  isMulti={false}
                  options={users}
                  getOptionLabel={(option) =>
                    `${option.displayName} ${option.sobrenome}`
                  }
                  getOptionValue={(option) => option.uid}
                  // defaultValue={users}
                  onChange={(e) => handleGetUser(e)}
                  isSearchable
                  required
                  components={animatedComponents}
                  closeMenuOnSelect={true}
                  placeholder="Selecione um usuario"
                  noOptionsMessage={() => "Nenhum usuário encontrado"}
                />
              </FormGroup>
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {/* <Row> */}
          {/* <Col> */}
          <Row className="btns-save-modal-transfer">
            {isConfirmModalOpen && selectjogador && (
              <AdminModalConfirmTransfer
                title={`Confirmar transferencia para ${selectjogador.displayName}?`}
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                lastModal={isOpen}
                setLastModal={setIsOpen}
                jogadores={jogador}
                selUser={selectjogador}
                marcInfo={dados}
              />
            )}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setIsConfirmModalOpen(!isConfirmModalOpen);
              }}
              disabled={!selectjogador}
            >
              Transferir
            </button>
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
          {/* </Col> */}
          {/* </Row> */}
        </ModalFooter>
      </Modal>
    </>
  );
};

const AdminModalConfirmTransfer = ({
  lastModal,
  setLastModal,
  isConfirmModalOpen,
  setIsConfirmModalOpen,
  title,
  jogadores,
  selUser,
  marcInfo,
}) => {
  const { loading: loadTransfer, adminTransfer } = useTransferAgendamento();
  const handleCLose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleFinish = (transferido) => {
    if (transferido) {
      toast.success("Transferencia concluida", {
        position: toast.POSITION.TOP_CENTER,
      });

      handleCLose();
      setLastModal(!lastModal);
    } else {
      toast.error("Transferencia não concluida", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleUpdate = async () => {
    const transferido = await adminTransfer(marcInfo, selUser, jogadores);
    handleFinish(transferido);
  };

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isConfirmModalOpen}
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
        {/* <ModalBody></ModalBody> */}
        <ModalFooter>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleUpdate();
            }}
          >
            Sim
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              handleCLose();
            }}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminTransferAgendamento;
