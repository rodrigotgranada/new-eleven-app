import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetUserPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetUserPassword(emailRef.current.value);
      setMessage("Verifique seu email para prosseguir");
    } catch (error) {
      console.log("error", error);
      setError("Falha ao atualizar senha");
    }

    setLoading(false);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Esqueceu a senha?</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Enviar Email
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/login">Entrar</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Não tem conta? <Link to="/signup">Cadastrar</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
