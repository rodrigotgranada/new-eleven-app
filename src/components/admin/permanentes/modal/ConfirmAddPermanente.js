import React, { useContext, useEffect, useState } from "react";
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
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Loading from "../../../public/Loading/Loading";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { ca } from "date-fns/locale";
import moment from "moment";

const ConfirmAddPermanente = ({
  isOpen,
  setIsOpen,
  selectedUser,
  title,
  dados,
  handleResetPermanente,
  setSelectedUser,
  oldOpen,
  oldSetIsOpen,
}) => {
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const {
    getDataWhere4: getRegistroPermanente,
    data: registroPermanente,
    loading: loadingRegistroPermanente,
  } = useGetData();
  const {
    getDataId: getQuadra,
    data: quadra,
    loading: loadingQuadra,
  } = useGetData();
  const { getDataId: getHora, data: hora, loading: loadingHora } = useGetData();
  const {
    getDataId: getTipoQuadra,
    data: tipoQuadra,
    loading: loadingTipoQuadra,
  } = useGetData();
  const [createdId, setCreatedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    getQuadra("quadras", permanente.quadra);
    getHora("horarios", permanente.hora);
    getTipoQuadra("tiposQuadra", permanente.tipoQuadra);
    return () => {};
  }, [isOpen, permanente]);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const confirm = await getRegistroPermanente(
      "permanentes",
      "diaSemana",
      "==",
      permanente.diaSemana,
      "quadra",
      "==",
      permanente.quadra,
      "hora",
      "==",
      permanente.hora,
      "tipoQuadra",
      "==",
      permanente.tipoQuadra
    );
    console.log("confirm", confirm);
    if (confirm && confirm.length > 0) {
      setError(true);
    } else {
      try {
        let registrado = "";
        const docRef = collection(db, "permanentes");
        await addDoc(docRef, permanente)
          .then((e) => {
            // console.log("EVENT IDS", e.id);
            registrado = e.id;
          })
          .then(async (event) => {
            // console.log("registrado", registrado);
            try {
              let dates = [];
              let dates_string = [];
              for (
                let i = moment(permanente.dataInicio);
                i.diff(permanente.dataFim, "days") <= 0;
                i.add(7, "days")
              ) {
                dates.push(i.clone());
                dates_string.push(i.format("YYYY-MM-DD"));
              }
              dates_string.map(async (date) => {
                let formatedDate3 = moment(date).format("DD/MM/YYYY");
                const dataF = formatedDate3.split("/");
                const anoFinal = dataF[2].slice(-2);
                const protocol = `${anoFinal}${dataF[1]}${dataF[0]}${hora?.value}${quadra?.numero}`;

                try {
                  const docRef = collection(db, "agenda");
                  const body = {
                    codLocacao: protocol,
                    step: 5,
                    user: permanente.user,
                    dataDia: date,
                    dataHorario: permanente.hora,
                    esporte: permanente.esporte,
                    tipoMarc: "usuario",
                    quadra: permanente.quadra,
                    jogadores: [
                      {
                        id: selectedUser.id,
                        name: selectedUser.displayName,
                        pago: false,
                        telefone: selectedUser.telefone,
                      },
                    ],
                    permanente: true,
                    permanente_id: registrado,
                    bloqueio: false,
                    bloqueio_id: "",
                  };
                  console.log("docRef", docRef, "body", body);
                  await addDoc(docRef, body).then((e) => {
                    console.log("cadastrado", date);
                  });
                } catch (error) {
                  console.log("error", error);
                }
              });
            } catch (error) {
              console.log("error", error);
            }
          });
        toast.success(`Permanente confirmada`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        handleResetPermanente();
        setSelectedUser(null);
        setIsOpen(false);
      } catch (error) {
        toast.error(`Permanente não confirmado, permanente já existe`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("registroPermanente", registroPermanente);
  }, [registroPermanente]);

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
          {loadingQuadra ||
            loadingHora ||
            (loadingTipoQuadra && <Loading type={`spin`} width={"30px"} />)}
          {selectedUser &&
            quadra &&
            hora &&
            tipoQuadra &&
            !loadingQuadra &&
            !loadingHora &&
            !loadingTipoQuadra &&
            !error && (
              <p>
                Deseja registrar uma permanente para {selectedUser.displayName}{" "}
                {selectedUser.sobrenome} ({selectedUser.telefone}) todas(os){" "}
                {permanente.diaSemana}s às {hora.value}:00 na quadra{" "}
                {quadra.name}({quadra.numero}) de {tipoQuadra.display} ?
              </p>
            )}
          {error && (
            <p>Permanente já existe, verifique os dados e tente novamente.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => handleConfirm()}
            disabled={loading || error}
          >
            {loading ? `Carregando...` : `Sim`}
          </Button>
          <Button type="button" color="danger" onClick={() => handleCLose()}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmAddPermanente;
