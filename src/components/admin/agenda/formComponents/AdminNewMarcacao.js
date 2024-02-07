import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Creatable, { useCreatable } from "react-select/creatable";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import CreatableSelect from "react-select/creatable";
import { useRef } from "react";
import MaskedInput from "../../../public/formComponents/MaskedInput";
import { Alert } from "react-bootstrap";
import AdminConfirmBloqueio from "../modal/AdminConfirmBloqueio";
import MaskedInputAdmin from "../../../public/formComponents/MaskedInputAdmin";
import "../../../../styles/admin/adminNewMarcacao.scss";
import moment from "moment";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import { GiConsoleController } from "react-icons/gi";

const AdminNewMarcacao = ({ dados, oldOpen, oldSetIsOpen, handleC }) => {
  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();
  const { getDataAgenda: getMarcacao, data: marcacao, loading } = useGetData();
  const {
    getDataId: getHorarioEscolhido,
    data: horarioEscolhido,
    loadingHorario,
  } = useGetData();
  const {
    getDataId: getEsporteEscolhido,
    data: esporteEscolhido,
    loadingEsporte,
  } = useGetData();
  const {
    getDataId: getQuadraEscolhida,
    data: quadraEscolhida,
    loadingQuadra,
  } = useGetData();
  const [value, setValue] = useState();
  const [modalBloquear, setModalBloquear] = useState(false);
  const [error, setError] = useState({
    name: null,
    telefone: null,
    selectedPlayer: null,
  });
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [avaible, setAvaible] = useState(true);
  const nameRef = useRef();
  const surnameRef = useRef();
  const telefoneRef = useRef();

  useEffect(() => {
    getUsers("users");
    return () => {};
  }, []);

  console.log("agendaID", dados);

  const defaultMarc = {
    codLocacao: "",
    bloqueio: "",
    bloqueio_id: "",
    createAt: "",
    dataDia: "",
    dataHorario: "",
    esporte: "",
    jogadores: [],
    permanente: "",
    permanente_id: "",
    quadra: "",
    status: "avulso",
    step: 5,
    tipoQuadra: dados?.type,
    user: "",
    singleMarc: true,
  };

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const handleChange = async (e) => {
    setSelectedPlayer(e);
  };
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
  const handleSaveInfo = async (e) => {
    const hora = await getHorarioEscolhido("horarios", dados?.dataHorario);

    const quadra = await getQuadraEscolhida("quadras", dados?.quadra);
    let formatedDate3 = moment(dados?.dataDia).format("DD/MM/YYYY");
    console.log("formatedDate3Confirm", formatedDate3);
    const dataF = formatedDate3.split("/");
    //  const data = marcacao?.dataDia.split("/");
    const anoFinal = dataF[2].slice(-2);
    const protocol = `${anoFinal}${dataF[1]}${dataF[0]}${hora?.value}${quadra?.numero}`;

    console.log("hora", hora);
    console.log("quadra", quadra);

    console.log("protocol", protocol);
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
        console.log("NOME", nameRef?.current?.value);
        console.log("TELEFONE", onlyNumbers(telefoneRef?.current?.value));
        console.log("SALVO");
        const resposta = await getMarcacao(
          "agenda",
          "dataDia",
          "==",
          dados.dataDia,
          "quadra",
          "==",
          dados.quadra,
          "dataHorario",
          "==",
          dados.dataHorario
        );
        defaultMarc.codLocacao = protocol;
        defaultMarc.createAt = moment(new Date()).format("YYYY-MM-DD");
        defaultMarc.dataDia = dados.dataDia;
        defaultMarc.dataHorario = dados.dataHorario;
        defaultMarc.quadra = dados.quadra;
        defaultMarc.jogadores[0] = {
          id: uuidv4(),
          name: nameRef?.current?.value,
          pago: false,
          telefone: onlyNumbers(telefoneRef?.current?.value),
        };
        defaultMarc.user = "avulso";

        if (!resposta) {
          addMarcacao(defaultMarc);
          // oldSetIsOpen(false);
          // setIsOpen(false);
        }
        // console.log("defaultMarc", defaultMarc);
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
    }
  };

  const addMarcacao = async (dados) => {
    try {
      const docRef = collection(db, "agenda");
      await addDoc(docRef, dados).then((e) => {
        // setConfirmed(true);
        toast.success(`Marcação confirmada`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(`Marcação não confirmada, quadra já ocupada neste horário`);
    }
  };

  const handleVerifySave = () => {
    if (currentActiveTab === "1") {
      return true;
    }
    return true;
  };

  return (
    <>
      {loadingUsers && <Loading type={`spin`} width={"30px"} />}
      {users && (
        <>
          <ModalBody>
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
            <>
              <Button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  handleSaveInfo();
                }}
              >
                Salvar
              </Button>
              {modalBloquear && (
                <AdminConfirmBloqueio
                  isOpen={modalBloquear}
                  setIsOpen={setModalBloquear}
                  oldOpen={oldOpen}
                  oldSetIsOpen={oldSetIsOpen}
                  title={`Bloquear quadra X`}
                  dados={dados}
                />
              )}
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setModalBloquear(!modalBloquear);
                }}
              >
                Bloquear
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleC();
                }}
              >
                Fechar
              </Button>
            </>
          </ModalFooter>
        </>
      )}
    </>
  );
};

export default AdminNewMarcacao;
