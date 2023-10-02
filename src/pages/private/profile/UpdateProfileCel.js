import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function UpdateProfileCel() {
  const emailRef = useRef();
  const telefoneRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUser,
    updateUserPassword,
    updateUserEmail,
    updateTelefoneUser,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (telefoneRef.current.value !== currentUser.usuario.telefone) {
      promises.push(updateTelefoneUser(currentUser, telefoneRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/my-profile");
      })
      .catch((e) => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Atualizar Celular</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="telefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    ref={telefoneRef}
                    required
                    defaultValue={currentUser?.usuario?.telefone}
                  />
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">
                  Atualizar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
