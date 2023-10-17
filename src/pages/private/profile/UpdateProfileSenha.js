import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function UpdateProfileSenha() {
  const oldDPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword } = useAuth();
  const [error, setError] = useState({
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const verificaSenhas = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      let password = { ...error };
      password[`password`] = `Senhas diferentes`;
      setError(password);
    } else {
      let password = { ...error };
      password[`password`] = null;
      setError(password);
    }
  };

  const verificaSenhaTamanho = async () => {
    if (passwordRef.current.value) {
      if (passwordRef.current.value.length < 6) {
        let password = { ...error };
        password[`password`] = `Senha precisa ter o minimo de 6 caracteres`;
        setError(password);
      } else {
        let password = { ...error };
        password[`password`] = null;
        setError(password);
      }
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value && oldDPasswordRef.current.value) {
      promises.push(
        updateUserPassword(
          oldDPasswordRef.current.value,
          passwordRef.current.value
        )
      );
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
              <h2 className="text-center mb-4">Atualizar senha</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6">
                    <FormGroup className="form-group-input" id="password">
                      <Label>Nova Senha</Label>
                      <Input
                        type="password"
                        placeholder="Nova Senha"
                        innerRef={passwordRef}
                        required
                        onBlur={verificaSenhaTamanho}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6">
                    <FormGroup
                      className="form-group-input"
                      id="password-confirm"
                    >
                      <Label>Confirmar Nova Senha</Label>
                      <Input
                        type="password"
                        placeholder="Confirmar Nova Senha"
                        innerRef={passwordConfirmRef}
                        required
                        onBlur={verificaSenhas}
                      />
                    </FormGroup>
                  </Col>

                  {error.password && (
                    <Col lg="12">
                      <Alert variant="danger">{error.password}</Alert>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col lg="12">
                    <FormGroup className="form-group-input" id="password">
                      <Label>Senha atual</Label>
                      <Input
                        type="password"
                        placeholder="Senha atual"
                        innerRef={oldDPasswordRef}
                        required
                        // onBlur={verificaSenhaTamanho}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Button
                  disabled={loading || error.password}
                  className="w-100"
                  type="submit"
                >
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
