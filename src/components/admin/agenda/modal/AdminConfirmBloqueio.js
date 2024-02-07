import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import useGetData from "../../../../hooks/useGetData";
import moment from "moment";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";

const AdminConfirmBloqueio = ({
  isOpen,
  setIsOpen,
  title,
  dados,
  oldOpen,
  oldSetIsOpen,
}) => {
  const { getDataAgenda: getMarcacao, data: marcacao, loading } = useGetData();
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  // const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();
  const [possible, setPossible] = useState(false);
  useEffect(() => {
    handleGetMarcacao();

    // return () => {

    // }
  }, [isOpen]);

  const handleGetMarcacao = async () => {
    getHorario("horarios", dados?.dataHorario);
    // getEsporte("modalidades", dados?.esporte);
    getQuadra("quadras", dados?.quadra);
    const resposta = await getMarcacao(
      "agenda",
      "dataDia",
      "==",
      dados.dataDia,
      "quadra",
      "==",
      dados.quadra,
      "dataHorario",
      "==",
      dados.dataHorario
    );
    resposta ? setPossible(false) : setPossible(true);
  };

  const handleCLose = () => {
    setIsOpen(false);
  };

  const addMarcacao = async (dados) => {
    try {
      const docRef = collection(db, "agenda");
      await addDoc(docRef, dados).then((e) => {
        // setConfirmed(true);
        toast.success(`Bloqueio confirmado`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(`Bloqueio não confirmado, quadra já ocupada neste horário`);
    }
  };

  const handleConfirmar = async () => {
    const resposta = await getMarcacao(
      "agenda",
      "dataDia",
      "==",
      dados.dataDia,
      "quadra",
      "==",
      dados.quadra,
      "dataHorario",
      "==",
      dados.dataHorario
    );

    const body = {
      bloqueio: true,
      bloqueio_id: "",
      createAt: moment(new Date()).format("YYYY-MM-DD"),
      dataDia: dados.dataDia,
      dataHorario: dados.dataHorario,
      esporte: "BLOQUEADO",
      permanente: false,
      permanente_id: "",
      quadra: dados.quadra,
      status: "BLOQUEADO",
      step: 5,
      tipoQuadra: dados.type,
      user: "BLOQUEADO",
    };

    if (!resposta) {
      addMarcacao(body);
      oldSetIsOpen(false);
      setIsOpen(false);
    }
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };

  return (
    <>
      <Modal
        size="md"
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
            <Col lg="12">
              <>
                {possible && quadra && hora ? (
                  <p>
                    Deseja Bloquear a quadra {quadra?.name} no horário das{" "}
                    {hora?.value}:00 do dia {formataData(dados?.dataDia)}
                  </p>
                ) : (
                  <p>Existe uma marcação nesse horário</p>
                )}
              </>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {possible && (
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleConfirmar();
              }}
            >
              Sim
            </Button>
          )}

          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleCLose();
            }}
          >
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminConfirmBloqueio;
