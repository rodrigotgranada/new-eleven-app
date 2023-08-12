import React, { useState } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
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
      await verifyUser()
      toast.success("E-mail enviado!");
    } catch {
      toast.error("E-mail não enviado!");
      setError("Failed to send email");
    }
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {console.log("current", currentUser)}
              {!currentUser?.emailVerified && <button onClick={handleVerify}>Verificar E-mail</button>}
              <h2 className="text-center mb-4">Usuário</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {currentUser?.photoURL ? (
                <img src={currentUser?.photoURL} alt="Capa" />
              ) : (
                <></>
              )}
              <strong>Nome:</strong> {currentUser.displayName}<br />
              <strong>Email:</strong> {currentUser.email}<br />
              <strong>Verificado:</strong> {currentUser.emailVerified ? "Sim" : "Não"}<br />

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