import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import useGetData from "../../../../hooks/useGetData";
import ChurrasqueiraContext from "../../../../contexts/ChurrasqueiraContext";
import moment from "moment";
import { useAuth } from "../../../../contexts/AuthContext";

const DesbloquearChurras = ({ isOpen, setIsOpen, infos }) => {
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
      // console.log("ressss", resposta);
      resposta ? setPossible(true) : setPossible(false);
    })();

    return () => {};
  }, []);

  const handleCLose = () => {
    setIsOpen(false);
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

    if (resposta) {
      try {
        const docRef = doc(db, "agenda_churras", resposta?.id);
        await deleteDoc(docRef).then((e) => {
          toast.success(`Bloqueio Cancelado!!`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          // oldSetIsOpen(false);
          setIsOpen(false);
        });
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
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
          {`Deseja desbloquear churrasqueira`}
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

export default DesbloquearChurras;
