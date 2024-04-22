import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import useAuthData from "../../../hooks/useAuthData";
import { FormGroup, Input, Label } from "reactstrap";

export default function UpdateProfileEmail() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, updateUserEmail } = useAuth();
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const { loading: loadAuth, getDataWhere } = useAuthData();

  const navigate = useNavigate();

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

  const capitalize = (item) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(
        updateUserEmail(
          currentUser,
          emailRef.current.value,
          passwordRef.current.value
        )
      );
    }
    Promise.all(promises)
      .then(() => {
        navigate("/meu-perfil");
      })
      .catch((e) => {
        setError("Falha ao atualizar E-mail");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Atualizar Email</h2>

              <Form onSubmit={handleSubmit} autoComplete="new-password">
                <FormGroup className="form-group-input" id="email">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    innerRef={emailRef}
                    placeholder="E-Mail"
                    defaultValue={currentUser.email}
                    required
                    onBlur={handleChange}
                    autoComplete="new-password"
                  />
                  {error.email && <Alert variant="danger">{error.email}</Alert>}
                </FormGroup>
                <FormGroup className="form-group-input" id="password">
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    placeholder="Senha"
                    innerRef={passwordRef}
                    required
                    defaultValue=""
                    onBlur={verificaSenhaTamanho}
                    autoComplete="new-password"
                  />
                </FormGroup>
                <Button
                  disabled={loading || error.email}
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
