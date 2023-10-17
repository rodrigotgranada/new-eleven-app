import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import ChangeCel from "./ChangeCel";
import useAuthData from "../../../hooks/useAuthData";
import { FormGroup, Input, Label } from "reactstrap";
import useVerifyCelNumber from "../../../hooks/useVerifyCelNumber";
import MaskedInputCel from "../../../components/public/formComponents/MaskedInputCel";
import "../../../styles/public/changeCel.scss";

export default function UpdateProfileCel() {
  const telefoneRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [verify, setVerify] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    verifyFunc,
    checkCelFunc,
    cancelChangeFunc,
    changeCelFunc,
    changeCelConcluidoFunc,
  } = useVerifyCelNumber();

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, value } = telefoneRef.current;
    const teste = await checkCelFunc(onlyNumbers(value), currentUser.uid);
    setError(teste);
    handleMessageVerify();
  };

  const handleMessageVerify = async () => {
    if (currentUser) {
      const verificacao = await verifyFunc(currentUser?.uid);
      setVerify(verificacao);
    }
  };

  const handleCancelChange = async () => {
    await cancelChangeFunc(currentUser?.uid);
    handleMessageVerify();
  };

  const handleHandleGetCode = async (userId, newNumber) => {
    const changed = await changeCelFunc(userId, newNumber);
    if (changed) {
      const concluido = await changeCelConcluidoFunc(currentUser?.uid);
      if (concluido) {
        handleMessageVerify();
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      handleMessageVerify();
    }
  }, [currentUser]);

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Atualizar Celular</h2>
              {verify && (
                <div>
                  <ChangeCel
                    user={currentUser}
                    codeVerify={verify}
                    handleHandleGetCode={handleHandleGetCode}
                    handleCancelChange={handleCancelChange}
                  />
                  {/* <button
                    onClick={handleCancelChange}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button> */}
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form-group-input" id="telefone">
                  <Label>Telefone</Label>
                  <MaskedInputCel
                    type="telefone"
                    id="telefone"
                    placeholder="Telefone"
                    reference={telefoneRef}
                    required={true}
                    setError={setError}
                    error={error}
                  />
                  {error?.error && (
                    <Alert variant="danger">{error?.error}</Alert>
                  )}
                </FormGroup>

                <Button disabled={loading} className="w-100" type="submit">
                  Solicitar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
