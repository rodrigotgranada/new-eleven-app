import React, { useState } from "react";
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
// import "../../styles/MyProfile.scss";

export default function MyProfile() {
  const [error, setError] = useState("");
  const [page, setPage] = useState("profile");
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
    if (!currentUser?.usuario?.checked) {
      return <ConfirmUser user={currentUser} />;
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
        <div className="w-100">
          <Card>
            <Card.Body>
              <Row>
                <Col lg="3">
                  <Sidebar>
                    <Menu>
                      <MenuItem onClick={() => setPage("profile")}>
                        {" "}
                        Meu Perfil{" "}
                      </MenuItem>
                      <MenuItem onClick={() => setPage("amigos")}>
                        {" "}
                        Amigos{" "}
                      </MenuItem>
                      <SubMenu label="Atualizar">
                        <MenuItem onClick={() => setPage("email")}>
                          {" "}
                          E-mail{" "}
                        </MenuItem>
                        <MenuItem onClick={() => setPage("senha")}>
                          {" "}
                          Senha{" "}
                        </MenuItem>
                        <MenuItem onClick={() => setPage("telefone")}>
                          {" "}
                          Celular{" "}
                        </MenuItem>
                        <MenuItem onClick={() => setPage("dados")}>
                          {" "}
                          Dados{" "}
                        </MenuItem>
                      </SubMenu>
                    </Menu>
                  </Sidebar>
                </Col>
                <Col lg="9">
                  {page === "profile" && (
                    <>
                      {handleMessageVerify()}
                      {/* <h2 className="text-center mb-4">Usuário</h2> */}
                      {error && <Alert variant="danger">{error}</Alert>}
                      {currentUser?.usuario?.photoURL ? (
                        <img
                          src={currentUser?.usuario?.photoURL}
                          alt="Capa"
                          style={{ height: "6rem" }}
                        />
                      ) : (
                        <></>
                      )}
                      <br />
                      {console.log(currentUser)}
                      <strong>Nome:</strong> {currentUser?.usuario?.displayName}
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
                      <br />
                      <strong>Admin:</strong>{" "}
                      {currentUser?.usuario?.rule ? "Sim" : "Não"}
                      <br />
                      <strong>Full:</strong>{" "}
                      {currentUser?.usuario?.owner ? "Sim" : "Não"}
                      <br />
                    </>
                  )}
                  {page === "email" && <UpdateProfileEmail />}
                  {page === "senha" && <UpdateProfileSenha />}
                  {page === "telefone" && <UpdateProfileCel />}
                  {page === "dados" && <UpdateProfileDados />}
                  {page === "amigos" && <MyFriends />}
                  {/* <Link
                    to="/update-profile"
                    className="btn btn-primary w-100 mt-3"
                  >
                    Atualizar usuário
                  </Link> */}
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
