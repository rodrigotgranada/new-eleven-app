import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import ConfirmUser from "../../../components/public/user/ConfirmUser";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import UpdateProfileEmail from "./UpdateProfileEmail";
import UpdateProfileSenha from "./UpdateProfileSenha";
import UpdateProfileCel from "./UpdateProfileCel";
import UpdateProfileDados from "./UpdateProfileDados";
import MyFriends from "./MyFriends";
import "../../../styles/public/myProfile.scss";

export default function MyProfile() {
  const [error, setError] = useState("");
  const [page, setPage] = useState("profile");
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [currentActiveTabb, setCurrentActiveTabb] = useState("a");
  const { currentUser, logout, verifyUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleVerify = async () => {
    try {
      await verifyUser();
      toast.success("E-mail enviado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch {
      toast.error("E-mail não enviado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setError("Failed to send email");
    }
  };

  const handleMessageVerify = () => {
    if (!currentUser?.usuario?.status) {
      return <h3>Usuário bloqueado, entre em contato com o administrador</h3>
    }
    if (currentUser?.usuario?.status && !currentUser?.usuario?.checked) {
      return <ConfirmUser user={currentUser} />;
    }
  };

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const toggle2 = (tab) => {
    if (currentActiveTabb !== tab) setCurrentActiveTabb(tab);
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
        <div className="w-100">
          <Card>
            <Card.Body className="new-body-profile">
              <Row>
                <Col lg="12">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={currentActiveTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Meu Perfil
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={currentActiveTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Atualizar
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={currentActiveTab}>
                    <TabPane tabId="1">
                      <Container className="d-flex align-items-center justify-content-center">
                        <div className="w-100">
                          <Card>
                            <Card.Body>
                              {handleMessageVerify()}
                              {error && <Alert variant="danger">{error}</Alert>}
                              <strong>Nome:</strong>{" "}
                              {currentUser?.usuario?.displayName}
                              <br />
                              <strong>Sobrenome:</strong>{" "}
                              {currentUser?.usuario?.sobrenome}
                              <br />
                              <strong>Email:</strong> {currentUser?.email}
                              <br />
                              <strong>Telefone:</strong>{" "}
                              {currentUser?.usuario?.telefone}
                              <br />
                              <strong>Verificado:</strong>{" "}
                              {currentUser?.usuario?.checked ? "Sim" : "Não"}
                            </Card.Body>
                          </Card>
                        </div>
                      </Container>
                    </TabPane>
                    <TabPane tabId="2">
                      <Nav tab>
                        <NavItem>
                          <NavLink
                            className={
                              currentActiveTabb === "a" ? "active" : ""
                            }
                            onClick={() => {
                              toggle2("a");
                            }}
                          >
                            E-mail
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={
                              currentActiveTabb === "b" ? "active" : ""
                            }
                            onClick={() => {
                              toggle2("b");
                            }}
                          >
                            Senha
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={
                              currentActiveTabb === "c" ? "active" : ""
                            }
                            onClick={() => {
                              toggle2("c");
                            }}
                          >
                            Telefone
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={
                              currentActiveTabb === "d" ? "active" : ""
                            }
                            onClick={() => {
                              toggle2("d");
                            }}
                          >
                            Dados
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={currentActiveTabb}>
                        <TabPane tabId="a">
                          <UpdateProfileEmail />
                        </TabPane>
                        <TabPane tabId="b">
                          <UpdateProfileSenha />
                        </TabPane>
                        <TabPane tabId="c">
                          <UpdateProfileCel />
                        </TabPane>
                        <TabPane tabId="d">
                          <UpdateProfileDados />
                        </TabPane>
                      </TabContent>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
