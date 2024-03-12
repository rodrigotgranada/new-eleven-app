import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
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
import { db } from "../../../firebase";
import useGetData from "../../../hooks/useGetData";
import Loading from "../Loading/Loading";
import useWhatsappApi from "../../../hooks/useWhatsappApi";
import useLogs from "../../../hooks/useLogs";
import moment from "moment";
import { useAuth } from "../../../contexts/AuthContext";

const ConfirmMarcacaoQuadra = ({
  title,
  isOpen,
  setIsOpen,
  marcacao,
  setMarcacao,
  usuario,
  handleConfirm,
  ...props
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [verify, setVerify] = useState(false);
  const [pro, setPro] = useState(false);
  const { currentUser } = useAuth();

  const {
    getDataAgenda: getConfirmAgenda,
    data: confirmAgenda,
    loadingconfirmAgenda,
  } = useGetData();
  const {
    getDataId: getHorarioEscolhido,
    data: horarioEscolhido,
    loadingHorario,
  } = useGetData();
  const {
    getDataId: getEsporteEscolhido,
    data: esporteEscolhido,
    loadingEsporte,
  } = useGetData();
  const {
    getDataId: getUserAtual,
    data: userAtual,
    loading: loadingUserAtual,
  } = useGetData();

  const {
    getDataId: getQuadraEscolhida,
    data: quadraEscolhida,
    loadingQuadra,
  } = useGetData();

  const { sendWelcome } = useWhatsappApi();
  const { logAgedamento, logAgendamentoDatabase } = useLogs();

  useEffect(() => {
    if (isOpen) {
      const geraProtocolo = async () => {
        const hora = await getHorarioEscolhido(
          "horarios",
          marcacao.dataHorario
        );
        const esporte = await getEsporteEscolhido(
          "modalidades",
          marcacao.esporte
        );
        const quadra = await getQuadraEscolhida("quadras", marcacao.quadra);
        let formatedDate3 = moment(marcacao?.dataDia).format("DD/MM/YYYY");
        // console.log("formatedDate3Confirm", formatedDate3);
        const data = formatedDate3.split("/");
        // const data = marcacao?.dataDia.split("/");
        const anoFinal = data[2].slice(-2);
        const protocol = `${anoFinal}${data[1]}${data[0]}${hora?.value}${quadra?.numero}`;

        let protocolo = { ...marcacao };
        protocolo.codLocacao = protocol;
        protocolo.singleMarc = true;
        protocolo.tipoMarc = "usuario";
        protocolo.createAt = moment(new Date()).format("YYYY-MM-DD");
        protocolo.status = "aberto";

        addMarcacao(protocolo, esporte, hora, quadra);
        setPro(protocolo);
        setVerify(1);
        logAgedamento("app", "add", protocolo, esporte, hora, quadra);
      };
      const verificaAgenda = async () => {
        let ocupada = await getConfirmAgenda(
          "agenda",
          "dataDia",
          "==",
          marcacao.dataDia,
          "dataHorario",
          "==",
          marcacao.dataHorario,
          "quadra",
          "==",
          marcacao.quadra
        );

        let permitido = await getUserAtual("users", currentUser?.uid);
        if (!ocupada) {
          if (!permitido?.checked) {
            setVerify(3);
          } else {
            geraProtocolo();
          }
        } else {
          setVerify(2);
        }
      };
      verificaAgenda();
    }
  }, [isOpen]);

  const navigate = useNavigate();

  const addMarcacao = async (dados, esporte, hora, quadra) => {
    try {
      const docRef = collection(db, "agenda");
      await addDoc(docRef, dados).then((e) => {
        setConfirmed(true);
        logAgendamentoDatabase("app", "quadra", "add", dados, currentUser);
        toast.success(`Marcação ${dados?.codLocacao} confirmada`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(`Marcação não confirmada, quadra já ocupada neste horário`);
    }
  };

  const handleCLose = () => {
    if (!confirmed) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
      navigate("/meus-agendamentos");
    }
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
        {!verify && <Loading type={`spin`} width={"30px"} />}
        {verify && (
          <ModalBody>
            <Row>
              <Col lg="12">
                {console.log(marcacao)}
                {verify === 1 && pro && (
                  <p>{`Marcação ${pro?.codLocacao} confirmada`}</p>
                )}
                {verify === 2 && (
                  <p>{`Marcação não confirmada, quadra já ocupada neste horário`}</p>
                )}
                {verify === 3 && (
                  <p>{`Marcação não confirmada, usuário desabilitado, entre em contato com Eleven Sports`}</p>
                )}
              </Col>
            </Row>
          </ModalBody>
        )}

        <ModalFooter>
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleCLose();
            }}
          >
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmMarcacaoQuadra;
