import React from "react";
import { Container, Row } from "react-bootstrap";
import { MdArrowBack } from "react-icons/md";
import Calendario from "../../../components/public/marcacao/calendario/Calendario";
import Confirmacao from "../../../components/public/marcacao/confirmacao/Confirmacao";
import Horario from "../../../components/public/marcacao/horario/Horario";
import Jogadores from "../../../components/public/marcacao/jogadores/Jogadores";
import Modalidade from "../../../components/public/marcacao/modalidade/Modalidade";
import Quadra from "../../../components/public/marcacao/quadra/Quadra";
import Steps from "../../../components/public/marcacao/steps/Steps";
import { MarcacaoProvider } from "../../../contexts/MarcacaoContext";
import useStepsForm from "../../../hooks/useStepsForm";
import "../../../styles/public/cadMarcacao.scss";

const CadMarcacao = () => {
  const formComponents = [
    <Calendario />,
    <Modalidade />,
    <Horario />,
    <Quadra />,
    <Jogadores />,
    <Confirmacao />,
  ];
  const { currentStep, currentComponent, changeStep, isFirstStep, isLastStep } =
    useStepsForm(formComponents);

  return (
    <Container>
      <Row>
        <MarcacaoProvider>
          <Steps currentStep={currentStep} changeStep={changeStep} />
          <div className="form__etapas">
            <div className="actions">
              {!isFirstStep && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => changeStep(currentStep - 1)}
                >
                  <span>
                    {" "}
                    <MdArrowBack /> Voltar
                  </span>
                </button>
              )}

              {/* {isLastStep ? (
                <button type="button">
                  <span>Enviar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => changeStep(currentStep + 1, e)}
                >
                  <span>Avançar</span>
                </button>
              )} */}
            </div>

            <div className="inputs-container"> {currentComponent} </div>
          </div>
        </MarcacaoProvider>
      </Row>
    </Container>
  );
};

export default CadMarcacao;
