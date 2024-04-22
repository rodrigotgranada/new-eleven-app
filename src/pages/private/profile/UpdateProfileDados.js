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
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import MaskedInputDados from "../../../components/public/formComponents/MaskedInputDados";
import "../../../styles/public/changeCel.scss";
import { FormGroup, Input, Label } from "reactstrap";

export default function UpdateProfileDados() {
  const nameRef = useRef();
  const surnameRef = useRef();
  const docRef = useRef();

  const { currentUser, atualizaDados } = useAuth();

  const [error, setError] = useState({
    documentoE: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log("e", e);
    e.preventDefault();

    const nameFinal = nameRef.current.value;
    const surnameFinal = surnameRef.current.value;
    const docFInal = onlyNumbers(docRef.current.value);
    let valida = true;
    if (valida) {
      const retorno = await atualizaDados(
        currentUser,
        nameFinal,
        surnameFinal
      );
      if (retorno) {
        toast.success("Dados atualizados com sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error("Dados não atualizados! Tente novamente mais tarde", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
    setLoading(false);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
  const handleChange = async () => {};
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Atualizar dados</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6">
                    <FormGroup className="form-group-input" id="name">
                      <Label>Nome</Label>
                      <Input
                        type="name"
                        innerRef={nameRef}
                        defaultValue={currentUser?.usuario?.displayName}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form-group-input" id="surname">
                      <Label>Sobrenome</Label>
                      <Input
                        type="surname"
                        innerRef={surnameRef}
                        defaultValue={currentUser?.usuario?.sobrenome}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form-group-input" id="doc">
                      <Label>Documento</Label>
                      <MaskedInputDados
                        type="documento"
                        id="documento"
                        placeholder="Documento"
                        reference={docRef}
                        defaultValue={currentUser?.usuario?.documento}
                        required={true}
                        setError={setError}
                        error={error}
                        disabled={true}
                      />
                      {error?.documentoE && (
                        <Alert variant="danger">{error?.documentoE}</Alert>
                      )}
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
                      {loading ? "Carregando..." : "Atualizar"}
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
