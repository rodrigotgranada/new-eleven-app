import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import FileInput from "../../../components/public/formComponents/FileInput";
import { useAuth } from "../../../contexts/AuthContext";
import useAuthData from "../../../hooks/useAuthData";
import "../../../styles/public/signup.scss";
import { toast } from "react-toastify";
import MaskedInput from "../../../components/public/formComponents/MaskedInput";
import MaskedInputSignup from "../../../components/public/formComponents/MaskedInputSignup";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center card-edit">
        <Col lg="12">
          <Card className="card-signup">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6">
                    <h2 className="text-center mb-4">Cadastro</h2>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="form-group-input" id="name">
                          <Label>Nome</Label>
                          <Input
                            type="name"
                            innerRef={nameRef}
                            placeholder="Nome"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="form-group-input" id="surname">
                          <Label>Sobrenome</Label>
                          <Input
                            type="surname"
                            innerRef={surnameRef}
                            placeholder="Sobrenome"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup className="form-group-input" id="email">
                          <Label>Email</Label>
                          <Input
                            id="email"
                            type="email"
                            innerRef={emailRef}
                            placeholder="E-Mail"
                            required
                            onBlur={handleChange}
                          />
                          {error.email && (
                            <Alert variant="danger">{error.email}</Alert>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="form-group-input" id="telefone">
                          <Label>Telefone / Whats</Label>
                          {/* <FormGroup ref={telefoneRef}> */}
                          <MaskedInputSignup
                            type="telefone"
                            id="telefone"
                            placeholder="Telefone"
                            reference={telefoneRef}
                            required={true}
                            onChange={handleChange}
                            setError={setError}
                            error={error}
                          />
                          {error.telefone && (
                            <Alert variant="danger">{error.telefone}</Alert>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="form-group-input" id="doc">
                          <Label>CPF</Label>

                          <MaskedInputSignup
                            type="documento"
                            id="documento"
                            placeholder="CPF"
                            reference={docRef}
                            required={true}
                            onChange={handleChange}
                            setError={setError}
                            error={error}
                          />
                          {error.documento && (
                            <Alert variant="danger">{error.documento}</Alert>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup className="form-group-input" id="password">
                          <Label>Senha</Label>
                          <Input
                            type="password"
                            placeholder="Senha"
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
                          <Label>Confirmar Senha</Label>
                          <Input
                            type="password"
                            placeholder="Confirmar Senha"
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
                  </Col>
                  <Col lg="6" className="col-picture-signup">
                    <FormGroup>
                      <FileInput
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        numImage={1}
                        rotulo={`Foto Perfil`}
                        tamanho={true}
                      />
                    </FormGroup>
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
                      {loading ? "Carregando..." : "Cadastrar"}
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
