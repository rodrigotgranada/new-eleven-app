import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import "./../../../styles/public/login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }

    return () => {};
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const authLogin = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      // console.log('authLogin', authLogin)
      if (authLogin.user.emailVerified) {
        toast.success("Bem-vindo!", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      } else {
        // toast.warning("E-mail não verificado!", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        navigate("/my-profile");
      }
    } catch (err) {
      console.log(err);
      toast.error("Usuário ou senha inválidos", {
        position: toast.POSITION.TOP_CENTER,
      });
      setError("Usuário ou senha inválidos");
    }

    setLoading(false);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center card-edit">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Entrar</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100 btn-login"
                  type="submit"
                >
                  Entrar
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Esqueceu a senha?</Link>
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
