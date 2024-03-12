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
import { toast } from "react-toastify";
import MaskedInputDados from "../../../components/public/formComponents/MaskedInputDados";
import useAuthData from "../../../hooks/useAuthData";
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
  const [selectedImages, setSelectedImages] = useState(
    currentUser?.usuario?.photoURL
  );
  const navigate = useNavigate();
  const { loading: loadAuth, getDataWhere } = useAuthData();

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log("e", e);
    e.preventDefault();

    const nameFinal = nameRef.current.value;
    const surnameFinal = surnameRef.current.value;
    const docFInal = onlyNumbers(docRef.current.value);
    const picture = selectedImages;
    let valida = true;
    // console.log(
    //   "docFInal",
    //   docFInal,
    //   "current",
    //   onlyNumbers(currentUser?.usuario?.documento)
    // );
    // if (
    //   onlyNumbers(docFInal) &&
    //   onlyNumbers(docFInal) != onlyNumbers(currentUser?.usuario?.documento)
    // ) {
    // const verificacao = await getDataWhere(
    //   "users",
    //   "documento",
    //   "==",
    //   docFInal
    // );
    // console.log("verificacao", verificacao);

    // if (verificacao) {
    //   let verify = { ...error };
    //   verify[`documentoE`] = `Documento já existe`;
    //   setError(verify);
    //   valida = false;
    // } else {
    //   let verify = { ...error };
    //   verify[`documentoE`] = null;
    //   setError(verify);
    //   valida = true;
    // }
    // }
    if (valida) {
      console.log("picture", picture);
      const retorno = await atualizaDados(
        currentUser,
        nameFinal,
        surnameFinal,
        picture
      );
      console.log("retorno", retorno);

      if (retorno) {
        toast.success("Dados atualizados com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Dados não atualizados! Tente novamente mais tarde", {
          position: toast.POSITION.TOP_CENTER,
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
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
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
                        // onBlur={handleChange}
                      />
                      {/* <Form.Control
                        type="text"
                        id="documento"
                        ref={docRef}
                        required

                        onBlur={handleChange}
                      /> */}
                      {error?.documentoE && (
                        <Alert variant="danger">{error?.documentoE}</Alert>
                      )}
                    </FormGroup>
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
                    {console.log(loading, error)}
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
