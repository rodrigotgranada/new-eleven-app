import React, { useState } from "react";
import { Alert, Button, Card, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
// import "../../styles/MyProfile.scss";

export default function MyProfile() {
  const [error, setError] = useState("");
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
        position: toast.POSITION.TOP_CENTER,
      });
    } catch {
      toast.error("E-mail não enviado!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setError("Failed to send email");
    }
  };

  const handleMessageVerify = () => {
    if (!currentUser?.emailVerified) {
      return <button onClick={handleVerify}>Verificar E-mail</button>;
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {handleMessageVerify()}
              <h2 className="text-center mb-4">Usuário</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {currentUser?.photoURL ? (
                <img
                  src={currentUser?.photoURL}
                  alt="Capa"
                  style={{ height: "6rem" }}
                />
              ) : (
                <></>
              )}
              <br />
              <strong>Nome:</strong> {currentUser?.displayName}
              <br />
              <strong>Email:</strong> {currentUser?.email}
              <br />
              <strong>Verificado:</strong>{" "}
              {currentUser?.emailVerified ? "Sim" : "Não"}
              <br />
              <strong>Admin:</strong>{" "}
              {currentUser?.usuario?.rule ? "Sim" : "Não"}
              <br />
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Atualizar usuário
              </Link>
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
