import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import "../../../styles/public/minhaMarcacaoModal.scss";

const MinhaMarcacao = ({
  title,
  isOpen,
  setIsOpen,
  marcacao,
  horario,
  esporte,
  quadra,
}) => {
  const handleCLose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {console.log("marcacao", marcacao)}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}
        className="responsive-modal"
      >
        <ModalHeader className="d-block justify-content-between w-100">
          <div className="d-flex justify-content-between w-100">
            {title ? title : ""}
            <div>
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleCLose();
                }}
              >
                x
              </span>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col lg="6">
              <h3>{`Agendamento`}</h3>
              <p>Hora: {`${horario?.value}:00`}</p>
              <p>Esporte: {esporte?.display}</p>
              <p>Quadra: {quadra?.name}</p>
            </Col>
            <Col lg="6">
              <h3>{`Jogadores`}</h3>
              <ol>
                {marcacao?.jogadores.map((jogador, index) => {
                  return (
                    <div className="list-players">
                      <input
                        type="text"
                        defaultValue={jogador?.name}
                        key={index}
                      />
                      <input
                        type="text"
                        defaultValue={jogador?.telefone}
                        key={index}
                      />
                      <button>+</button>
                      <button>-</button>
                    </div>
                  );
                })}
              </ol>
              <div className="btn-save-players">
                <Button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    console.log("Salvo");
                  }}
                >
                  Salvar
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleCLose();
            }}
          >
            Cancelar Agendamento
          </Button>
          <Button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              handleCLose();
            }}
          >
            Transferir
          </Button>
          <Button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              handleCLose();
            }}
          >
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MinhaMarcacao;
