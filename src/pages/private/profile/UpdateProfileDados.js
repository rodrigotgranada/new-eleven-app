import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import FileInput from "../../../components/public/formComponents/FileInput";

export default function UpdateProfileDados() {
  const nameRef = useRef();
  const surnameRef = useRef();
  const docRef = useRef();

  const {
    currentUser,
    updateUserPassword,
    updateUserEmail,
    updateTelefoneUser,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleChange = async () => {};

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Atualizar dados</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6">
                    <Form.Group id="name">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="name" ref={nameRef} required />
                    </Form.Group>

                    <Form.Group id="surname">
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control type="surname" ref={surnameRef} required />
                    </Form.Group>

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
                      Atualizar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
