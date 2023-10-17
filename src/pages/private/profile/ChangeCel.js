import React, { useEffect, useState } from "react";
import { BiTennisBall } from "react-icons/bi";
import VerificationInput from "react-verification-input";
import { Col, Container, Row } from "reactstrap";
import "../../../styles/public/confirmUser.scss";
import useAuthData from "../../../hooks/useAuthData";
import { Alert } from "react-bootstrap";
import BotaoComTempoDeEspera from "../../../components/public/BotaoComTempoDeEspera/BotaoComTempoDeEspera";
import useWhatsappApi from "../../../hooks/useWhatsappApi";
import { toast } from "react-toastify";
import useVerifyCelNumber from "../../../hooks/useVerifyCelNumber";

const ChangeCel = ({
  user,
  codeVerify,
  handleHandleGetCode,
  handleCancelChange,
}) => {
  const [code, setCode] = useState(null);
  const { sendConfirmPT } = useWhatsappApi();
  const { getDataId } = useAuthData();

  const handleVerify = async (codigo) => {
    // console.log("current", codeVerify);
    // const userCode = await getDataId("users", user.uid);
    const codeAuth = codeVerify.code;
    console.log("codigo usuario", parseInt(codeAuth));
    console.log("codigo digitado", parseInt(codigo));

    if (parseInt(codigo) === parseInt(codeAuth)) {
      handleHandleGetCode(codeVerify.user_id, codeVerify.tempCel);
      // changeCelFunc();
      setCode(true);
    } else {
      setCode(false);
    }
  };

  const reenviarCodigo = async () => {
    const enviado = await sendConfirmPT(codeVerify.tempCel, codeVerify.code);

    console.log("enviado", enviado);

    if (enviado) {
      toast.success("Código enviado!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Código não enviado!", {
        position: toast.POSITION.TOP_CENTER,
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
        <Col lg="3" className="container-verification">
          <BotaoComTempoDeEspera
            mensagem={"Reenviar código"}
            reenviarCodigo={reenviarCodigo}
          />
        </Col>
        <Col lg="3" className="container-verification">
          <button
            className="btn btn-danger w-100 mt-3"
            onClick={handleCancelChange}
          >
            Cancelar
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeCel;
