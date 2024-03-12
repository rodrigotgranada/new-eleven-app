import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import ConfirmCancelChurras from "../../agenda/modal/ConfirmCancelChurras";
import BloquearChurras from "../../agenda/modal/BloquearChurras";
import ChurrasqueiraContext from "../../../../contexts/ChurrasqueiraContext";
import moment from "moment";
import MaskedInputAdmin from "../../../public/formComponents/MaskedInputAdmin";
import { Alert } from "react-bootstrap";
import useGetData from "../../../../hooks/useGetData";
import DesbloquearChurras from "../../agenda/modal/DesbloquearChurras";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import useLogs from "../../../../hooks/useLogs";
import { useAuth } from "../../../../contexts/AuthContext";

const MarcacaoChurras = ({ isOpen, setIsOpen, infos }) => {
  console.log("infos", infos);
  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();
  const { getDataAgenda: getMarcacao, data: marcacao, loading } = useGetData();
  const [modalCancel, setModalCancel] = useState(false);
  const [modalBloqueio, setModalBloqueio] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { churrasqueiraDate, setChurrasqueiraDate } =
    useContext(ChurrasqueiraContext);
  const nameRef = useRef();
  const surnameRef = useRef();
  const telefoneRef = useRef();
  // console.log("infos", infos);
  const [error, setError] = useState({
    name: null,
    telefone: null,
    selectedPlayer: null,
    selectedEsporteB: null,
  });
  const { logAgedamento, logAgendamentoDatabase } = useLogs();
  const { currentUser } = useAuth();
  const handleCLose = () => {
    setIsOpen(false);
  };
  const handleChange = async (e) => {
    setSelectedPlayer(e);
  };
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    getUsers("users");
    // getQuadraEscolhida("quadras", dados?.quadra);

    return () => {};
  }, []);

  const defaultMarc = {
    codLocacao: "",
    bloqueio: "",
    bloqueio_id: "",
    createAt: "",
    dataDia: "",
    dataHorario: "",
    permanente: "",
    permanente_id: "",
    churrasqueira: "",
    status: "avulso",
    tipoMarc: "",
    step: 5,
    user: "",
    singleMarc: true,
  };
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
  const handleSaveInfo = async (e) => {
    let formatedDate3 = moment(churrasqueiraDate).format("DD/MM/YYYY");
    const dataF = formatedDate3.split("/");
    const anoFinal = dataF[2].slice(-2);
    const turno = infos?.type?.value.charAt(0);
    const protocol = `${anoFinal}${dataF[1]}${dataF[0]}${turno}${infos?.churrasqueira?.numero}`;
    if (currentActiveTab === "1") {
      let verify = { ...error };
      if (!nameRef?.current?.value || nameRef?.current?.value.length < 1) {
        verify[`${"name"}`] = `Nome não pode ser Nulo`;
      }
      if (nameRef?.current?.value && nameRef?.current?.value.length > 0) {
        verify[`${"name"}`] = null;
      }
      if (
        !telefoneRef?.current?.value ||
        telefoneRef?.current?.value.length < 11
      ) {
        verify[`${"telefone"}`] = `Telefone inválido`;
      }
      if (
        telefoneRef?.current?.value &&
        telefoneRef?.current?.value.length === 11
      ) {
        verify[`${"telefone"}`] = null;
      }

      setError(verify);

      if (!verify.name && !verify.telefone) {
        const resposta = await getMarcacao(
          "agenda_churras",
          "churrasqueira",
          "==",
          infos?.churrasqueira.id,
          "dataDia",
          "==",
          moment(churrasqueiraDate).format("YYYY-MM-DD"),
          "dataHorario",
          "==",
          infos?.type?.value
        );
        defaultMarc.codLocacao = protocol;
        defaultMarc.createAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        defaultMarc.dataDia = moment(churrasqueiraDate).format("YYYY-MM-DD");
        defaultMarc.dataHorario = infos?.type?.value;
        defaultMarc.churrasqueira = infos?.churrasqueira?.id;
        defaultMarc.tipoMarc = "avulso";

        defaultMarc.user = {
          nome: nameRef?.current?.value,
          telefone: onlyNumbers(telefoneRef?.current?.value),
        };

        if (!resposta) {
          addMarcacao(defaultMarc);
        }
      }
    } else {
      console.log(selectedPlayer);
      let verify = { ...error };
      if (selectedPlayer) {
        verify[`${"selectedPlayer"}`] = null;
        console.log("SALVO");
      } else {
        verify[`${"selectedPlayer"}`] = `Selecione um cliente`;
      }

      setError(verify);
      if (!verify.selectedPlayer && !verify.selectedEsporteB) {
        const resposta = await getMarcacao(
          "agenda_churras",
          "churrasqueira",
          "==",
          infos?.churrasqueira.id,
          "dataDia",
          "==",
          moment(churrasqueiraDate).format("YYYY-MM-DD"),
          "dataHorario",
          "==",
          infos?.type?.value
        );

        let MeuUser = users.filter(function (el) {
          return el.id === selectedPlayer.id;
        });
        if (MeuUser.length > 0) {
          defaultMarc.codLocacao = protocol;
          defaultMarc.createAt = moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          defaultMarc.dataDia = moment(churrasqueiraDate).format("YYYY-MM-DD");
          defaultMarc.dataHorario = infos?.type?.value;
          defaultMarc.churrasqueira = infos?.churrasqueira?.id;
          defaultMarc.tipoMarc = "usuario";

          defaultMarc.user = MeuUser[0].id;
        }
        if (!resposta) {
          addMarcacao(defaultMarc);
        }
      }
    }
  };

  const addMarcacao = async (dados) => {
    try {
      const docRef = collection(db, "agenda_churras");
      await addDoc(docRef, dados).then((e) => {
        logAgendamentoDatabase("interno", "churras", "add", dados, currentUser);
        toast.success(`Marcação confirmada`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(
        `Marcação não confirmada, churrasqueira já ocupada neste horário`
      );
    }
  };

  if (infos?.bloqueio || infos?.config) {
    return (
      <>
        <Modal
          size={infos?.data?.bloqueio ? "sm" : "md"}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={isOpen}
          className="responsive-modal"
        >
          <ModalHeader className="d-block justify-content-between w-100">
            <div className="d-flex justify-content-between w-100">
              {infos.bloqueio
                ? "Churrasqueira Bloqueada"
                : `Desmarcar Marcação de ${
                    infos?.user?.displayName || infos?.config?.user?.nome
                  } ${infos?.user?.sobrenome || ""}`}
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
            <p>
              {" "}
              Churrasqueira:{" "}
              {`${infos.churrasqueira.nome} (${infos.churrasqueira.numero})`}
            </p>
            <p> Dia: {`${moment(churrasqueiraDate).format("DD/MM/YYYY")}`}</p>
            <p> Turno: {`${infos.type.display}`}</p>
            {!infos.bloqueio ? (
              <p>
                Telefone:{" "}
                {`${infos?.user?.telefone || infos?.config?.user?.telefone}`}{" "}
              </p>
            ) : (
              ""
            )}
          </ModalBody>

          <ModalFooter>
            {/* {data.bloqueio ? buttonsBloqueio : buttonsEdit} */}
            {infos?.bloqueio && (
              <>
                {modalBloqueio && (
                  <DesbloquearChurras
                    isOpen={modalBloqueio}
                    setIsOpen={setModalBloqueio}
                    infos={infos}
                  />
                )}
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setModalBloqueio(!modalBloqueio);
                  }}
                >
                  Desbloquear
                </Button>
              </>
            )}
            {infos.config && !infos.bloqueio && (
              <>
                {modalCancel && (
                  <ConfirmCancelChurras
                    isOpen={modalCancel}
                    setIsOpen={setModalCancel}
                    infos={infos}
                  />
                )}
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setModalCancel(!modalCancel);
                  }}
                >
                  Cancelar Marcacao
                </Button>
              </>
            )}
            <Button
              type="button"
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
  } else {
    return (
      <>
        <Modal
          size={infos?.data?.bloqueio ? "sm" : "lg"}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={isOpen}
          className="responsive-modal"
        >
          <ModalHeader className="d-block justify-content-between w-100">
            <div className="d-flex justify-content-between w-100">
              {`Marcar Churrasqueira ${infos.churrasqueira?.nome} (${infos.churrasqueira?.numero})`}
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
              <p>
                {" "}
                Churrasqueira:{" "}
                {`${infos?.churrasqueira?.nome} (${infos?.churrasqueira?.numero})`}
              </p>
              <p> Turno: {`${infos?.type?.display}`}</p>
            </Row>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={currentActiveTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Cliente Avulso
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={currentActiveTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Cliente Registrado
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Row>
                        <Col lg="6">
                          <FormGroup className="form-group-input" id="name">
                            <Label>Nome</Label>
                            <Input
                              type="name"
                              name="name"
                              innerRef={nameRef}
                              // onBlur={handleVerify}
                              placeholder="Nome"
                              required
                            />
                            {error.name && (
                              <Alert variant="danger">{error.name}</Alert>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="form-group-input" id="telefone">
                            <Label>Telefone / Whats</Label>
                            <MaskedInputAdmin
                              type="telefone"
                              id="telefone"
                              placeholder="Telefone"
                              reference={telefoneRef}
                              required={true}
                              // onBlur={handleChange}
                              setError={setError}
                              error={error}
                            />
                            {error.telefone && (
                              <Alert variant="danger">{error.telefone}</Alert>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col lg="12">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={users}
                        getOptionLabel={(option) =>
                          `${option.displayName} ${option.sobrenome} - (${option.telefone})`
                        }
                        getOptionValue={(option) => option.id}
                        onChange={handleChange}
                        placeholder={"Selecione um usuário"}
                        noOptionsMessage={() => "Usuário não encontrado"}
                      />
                      {error.selectedPlayer && (
                        <Alert variant="danger">{error.selectedPlayer}</Alert>
                      )}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleSaveInfo();
              }}
            >
              Salvar
            </Button>

            {!infos.config && (
              <>
                {modalBloqueio && (
                  <BloquearChurras
                    isOpen={modalBloqueio}
                    setIsOpen={setModalBloqueio}
                    infos={infos}
                  />
                )}
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setModalBloqueio(!modalBloqueio);
                  }}
                >
                  Bloquear
                </Button>
              </>
            )}
            <Button
              type="button"
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
  }
};

export default MarcacaoChurras;
