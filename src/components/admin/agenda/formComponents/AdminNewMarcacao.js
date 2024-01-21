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
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import CreatableSelect from "react-select/creatable";
import { useRef } from "react";
import MaskedInput from "../../../public/formComponents/MaskedInput";
import { Alert } from "react-bootstrap";
import AdminConfirmBloqueio from "../modal/AdminConfirmBloqueio";

const AdminNewMarcacao = ({ dados, oldOpen, oldSetIsOpen, handleC }) => {
  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();
  const [value, setValue] = useState();
  const [modalBloquear, setModalBloquear] = useState(false);
  const [error, setError] = useState({
    telefone: null,
  });
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const nameRef = useRef();
  const surnameRef = useRef();
  const telefoneRef = useRef();

  useEffect(() => {
    getUsers("users");
    return () => {};
  }, []);

  console.log("agendaID", dados);
  const animatedComponents = makeAnimated();
  const handleGetUser = async (e) => {
    console.log(e);
  };

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const handleCreate = (inputValue, action) => {
    return console.log("NOVO", inputValue, action);
  };

  const handleChange = async (e) => {
    console.log(e);
  };
  useEffect(() => {
    console.log("ABA", currentActiveTab);
  }, [currentActiveTab]);

  return (
    <>
      {loadingUsers && <Loading type={`spin`} width={"30px"} />}
      {users && (
        <>
          <ModalBody>
            {/*  */}

            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={currentActiveTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Avulso
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={currentActiveTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Registrado
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
                              innerRef={nameRef}
                              placeholder="Nome"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="form-group-input" id="telefone">
                            <Label>Telefone / Whats</Label>
                            <MaskedInput
                              type="telefone"
                              id="telefone"
                              placeholder="Telefone"
                              reference={telefoneRef}
                              required={true}
                              onBlur={handleChange}
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
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
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
                  handleC();
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
