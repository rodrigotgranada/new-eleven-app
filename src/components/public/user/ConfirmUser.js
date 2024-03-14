import React, { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import useAuthData from "../../../hooks/useAuthData";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { BiTennisBall } from "react-icons/bi";
import "../../../styles/public/confirmUser.scss";
import { Container } from "reactstrap";
import useWhatsappApi from "../../../hooks/useWhatsappApi";
import { toast } from "react-toastify";
import BotaoComTempoDeEspera from "../BotaoComTempoDeEspera/BotaoComTempoDeEspera";

const ConfirmUser = ({ user }) => {
  console.log("usersss", user);
  const [code, setCode] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { atualizaVerificado } = useAuth();
  const { sendConfirmPT } = useWhatsappApi();
  const { getDataId } = useAuthData();

  const handleVerify = async (codigo) => {
    // console.log("current", currentUser);
    const userCode = await getDataId("users", user.uid);
    console.log("codigo usuario", userCode?.codAuth);
    console.log("codigo digitado", codigo);

    if (parseInt(codigo) === parseInt(userCode?.codAuth)) {
      atualizaVerificado(user);
      setCode(true);
    } else {
      setCode(false);
    }
  };

  const reenviarCodigo = async () => {
    const enviado = await sendConfirmPT(
      user?.usuario?.telefone,
      user?.usuario?.codAuth
    );

    console.log("enviado", enviado);

    if (enviado) {
      toast.success("Código enviado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.error("Código não enviado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="6" className="container-confirm">
          <p>Digite o código de verificação</p>
        </Col>
      </Row>
      <Row>
        <Col lg="6" className="container-confirm">
          <VerificationInput
            onComplete={(e) => handleVerify(e)}
            length={6}
            validChars="0-9"
            removeDefaultStyles
            placeholder={<BiTennisBall />}
            classNames={{
              container: "container-confirm",
              characters: "characters-confirm",
              character: "character-confirm",
              characterInactive: "character--inactive-confirm",
              characterSelected: "character--selected-confirm",
            }}
          />
        </Col>
      </Row>
      {!code && code != null && (
        <Row>
          <Col lg="6">
            <Alert
              variant="danger"
              style={{
                margin: "0.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >{`Código inválido`}</Alert>
          </Col>
        </Row>
      )}
      {/* <Row>
        <Col lg="12">
          <Button onClick={reenviarCodigo} disabled={buttonDisabled}>
            Reenviar código
          </Button>
        </Col>
      </Row> */}
      <Row>
        <Col lg="6" className="container-verification">
          <BotaoComTempoDeEspera
            mensagem={"Reenviar código"}
            reenviarCodigo={reenviarCodigo}
          />
        </Col>
      </Row>
    </Container>
    // <div className="codeVerification">

    // </div>
  );
};

export default ConfirmUser;
