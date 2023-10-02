import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function UpdateProfileEmail() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserEmail } = useAuth();
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

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(currentUser, emailRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/my-profile");
      })
      .catch((e) => {
        setError("Falha ao atualizar E-mail");
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
              <h2 className="text-center mb-4">Atualizar Email</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
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
