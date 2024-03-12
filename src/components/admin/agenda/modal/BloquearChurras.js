import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import useGetData from "../../../../hooks/useGetData";
import ChurrasqueiraContext from "../../../../contexts/ChurrasqueiraContext";
import moment from "moment";
import { useAuth } from "../../../../contexts/AuthContext";

const BloquearChurras = ({ isOpen, setIsOpen, infos }) => {
  const [possible, setPossible] = useState(false);
  const { getDataAgenda: getMarcacao, data: marcacao, loading } = useGetData();
  const { churrasqueiraDate, setChurrasqueiraDate } =
    useContext(ChurrasqueiraContext);

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const resposta = await getMarcacao(
        "agenda_churras",
        "churrasqueira",
        "==",
        infos?.churrasqueira.id,
        "dataDia",
        "==",
        moment(churrasqueiraDate).format("YYYY-MM-DD"),
        "dataHorario",
        "==",
        infos?.type?.value
      );
      resposta ? setPossible(false) : setPossible(true);
    })();

    return () => {};
  }, []);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const addMarcacao = async (dados) => {
    try {
      const docRef = collection(db, "agenda_churras");
      await addDoc(docRef, dados).then((e) => {
        // setConfirmed(true);
        toast.success(`Bloqueio confirmado`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } catch (error) {
      toast.error(
        `Bloqueio não confirmado, churrasqueira já ocupada neste horário`
      );
    }
  };

  const handleConfirmar = async () => {
    const resposta = await getMarcacao(
      "agenda_churras",
      "churrasqueira",
      "==",
      infos?.churrasqueira.id,
      "dataDia",
      "==",
      moment(churrasqueiraDate).format("YYYY-MM-DD"),
      "dataHorario",
      "==",
      infos?.type?.value
    );

    const body = {
      churrasqueira: infos?.churrasqueira.id,
      bloqueio: true,
      bloqueio_id: "",
      createAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      owner: {
        nome: currentUser?.usuario?.displayName,
        telefone: currentUser?.usuario?.telefone,
        id: currentUser?.uid,
      },
      dataDia: moment(churrasqueiraDate).format("YYYY-MM-DD"),
      dataHorario: infos?.type?.value,
      tipoMarc: "bloqueio",
      // user: "BLOQUEADO",
    };

    if (!resposta) {
      addMarcacao(body);
      // oldSetIsOpen(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      size={"md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      <ModalHeader className="d-block justify-content-between w-100">
        <div className="d-flex justify-content-between w-100">
          {`Deseja bloquear churrasqueira`}
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
      {/* <ModalBody></ModalBody> */}
      <ModalFooter>
        {possible && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleConfirmar();
            }}
          >
            Sim
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleCLose()}
        >
          Não
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default BloquearChurras;
