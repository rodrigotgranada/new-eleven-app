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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";

const AdminConfirmDesbloqueio = ({
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
    resposta.length > 0 ? setPossible(false) : setPossible(true);
  };

  const handleCLose = () => {
    setIsOpen(false);
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

    if (resposta) {
      try {
        const docRef = doc(db, "agenda", resposta.id);
        await updateDoc(docRef, {
          user: "agendamentoCancelado",
          // dataDia: "2022-01-01",
        }).then(async (e) => {
          try {
            const docRef = doc(db, "agenda", resposta.id);
            await deleteDoc(docRef).then((e) => {
              toast.success(`Bloqueio Cancelado!!`);
              oldSetIsOpen(false);
              setIsOpen(false);
            });
          } catch (error) {
            toast.error(error.message);
          }
        });
      } catch (error) {
        toast.error(error.message);
      }
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

export default AdminConfirmDesbloqueio;
