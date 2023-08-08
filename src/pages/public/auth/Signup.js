import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory, useNavigate } from "react-router-dom";
import FileInput from "../../../components/public/formComponents/FileInput";
import { Input, Label } from "reactstrap";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const navigate = useNavigate();

  const handleRule = (e) => {
    const { name, checked, value } = e.target;
    setRule(checked)
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Senhas diferentes");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        selectedImages,
        rule
      );
      navigate("/");
    } catch {
      setError("Falha ao criar conta");
    }

    setLoading(false);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Novo usuário</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="name" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <FileInput
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    numImage={1}
                  />
                </Form.Group>
                <Form.Group>
                <Label check>
                  <Input
                    type="checkbox"
                    name= 'rule'
                    value={rule || ''}
                    // checked={true}
                    onChange={(e) => handleRule(e)}
                  />{" "}
                  <strong>Admin?</strong>
                </Label>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Cadastrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
