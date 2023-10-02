import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import FileInput from "../../../components/public/formComponents/FileInput";
import { useAuth } from "../../../contexts/AuthContext";
import useAuthData from "../../../hooks/useAuthData";
import "../../../styles/public/signup.scss";
import { toast } from "react-toastify";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const telefoneRef = useRef();
  const docRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup, signup2 } = useAuth();
  const [error, setError] = useState({
    email: null,
    telefone: null,
    documento: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [rule, setRule] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const navigate = useNavigate();
  const { loading: loadAuth, getDataWhere } = useAuthData();

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  const handleRule = (e) => {
    const { checked } = e.target;
    setRule(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Senhas diferentes");
    // }

    try {
      setError("");
      setLoading(true);
      await signup2(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        surnameRef.current.value,
        telefoneRef.current.value,
        docRef.current.value,
        selectedImages,
        rule,
        active
      );
      navigate("/login");
      toast.success("Usuário criado... E-mail enviado!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch {
      toast.error("Usuário não registrado!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setError("Falha ao criar conta");
    }

    setLoading(false);
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;
    console.log("id", id, "value", value);
    const verificacao = await getDataWhere("users", id, "==", value);
    console.log("verificacao", verificacao);

    if (verificacao) {
      let verify = { ...error };
      verify[`${id}`] = `${capitalize(id)} já existe`;
      setError(verify);
    } else {
      let verify = { ...error };
      verify[`${id}`] = null;
      setError(verify);
    }
  };

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const capitalize = (item) => {
    return item[0].toUpperCase() + item.slice(1);
  };

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
    if (passwordRef.current.value.length < 6) {
      let password = { ...error };
      password[`password`] = `Senha precisa ter o minimo de 6 caracteres`;
      setError(password);
    } else {
      let password = { ...error };
      password[`password`] = null;
      setError(password);
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center gap-3">
        <Col lg="12">
          <Card className="card-signup">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6">
                    <h2 className="text-center mb-4">Novo usuário</h2>
                    <Row>
                      <Col lg="6">
                        <Form.Group id="name">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control type="name" ref={nameRef} required />
                        </Form.Group>
                      </Col>
                      <Col lg="6">
                        <Form.Group id="surname">
                          <Form.Label>Sobrenome</Form.Label>
                          <Form.Control
                            type="surname"
                            ref={surnameRef}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            id="email"
                            type="email"
                            ref={emailRef}
                            required
                            onBlur={handleChange}
                          />
                          {error.email && (
                            <Alert variant="danger">{error.email}</Alert>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Form.Group id="telefone">
                          <Form.Label>Telefone / Whats</Form.Label>
                          <Form.Control
                            type="telefone"
                            id="telefone"
                            ref={telefoneRef}
                            onBlur={handleChange}
                            required
                          />
                          {error.telefone && (
                            <Alert variant="danger">{error.telefone}</Alert>
                          )}
                        </Form.Group>
                      </Col>
                      <Col lg="6">
                        <Form.Group id="doc">
                          <Form.Label>Documento</Form.Label>
                          <Form.Control
                            type="text"
                            id="documento"
                            ref={docRef}
                            required
                            onBlur={handleChange}
                          />
                          {error.documento && (
                            <Alert variant="danger">{error.documento}</Alert>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <Form.Group id="password">
                          <Form.Label>Senha</Form.Label>
                          <Form.Control
                            type="password"
                            ref={passwordRef}
                            required
                            onBlur={verificaSenhaTamanho}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg="6">
                        <Form.Group id="password-confirm">
                          <Form.Label>Confirmar Senha</Form.Label>
                          <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            required
                            onBlur={verificaSenhas}
                          />
                        </Form.Group>
                      </Col>

                      {error.password && (
                        <Col lg="12">
                          <Alert variant="danger">{error.password}</Alert>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col lg="6" className="col-picture-signup">
                    <Form.Group>
                      <FileInput
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        numImage={1}
                        rotulo={`Foto Perfil`}
                        tamanho={true}
                      />
                    </Form.Group>
                    {/* {currentUser?.usuario?.owner && (
                      <Form.Group>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="rule"
                            value={rule || false}
                            // checked={true}
                            onChange={(e) => handleRule(e)}
                          />{" "}
                          <strong>Admin?</strong>
                        </Label>
                      </Form.Group>
                    )} */}
                  </Col>
                </Row>
                <Row className="d-flex align-items-center justify-content-center row-button-signup">
                  <Col lg="6">
                    <Button
                      disabled={
                        loading ||
                        error.email ||
                        error.documento ||
                        error.telefone ||
                        error.password
                      }
                      className="w-100"
                      type="submit"
                    >
                      Cadastrar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </div>
        </Col>
        {/* </Row> */}

        {/* </div> */}
      </Container>
    </>
  );
}
