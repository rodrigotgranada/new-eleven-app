import moment from "moment";
import React from "react";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loading from "../../public/Loading/Loading";
import NameButton from "./NameButton";
import { useContext } from "react";
import AgendaContext from "../../../contexts/AgendaContext";
import AdminMarcacaoModal from "./modal/AdminMarcacaoModal";

const ButtonHorarioAgenda = ({ horario, dataClick, quadraClick }) => {
  const { currentUser } = useAuth();
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);
  const [ModalOpen, setModalOpen] = useState(false);
  // const {
  //   getDataSnapAttButtonAgenda: getAgendamento,
  //   data: agendamento,
  //   loading: carregaAgendamento,
  // } = useGetData();

  const { getDataId } = useGetData();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [nome, setNome] = useState(null);
  const [bloqueio, setBloqueio] = useState(false);
  useEffect(() => {
    // if ((agendaDate, horario, quadraClick)) {
    teste();
    // }
    return () => {
      setNome(null);
      setData(null);
      setBloqueio(null);
    };
  }, [agendaDate]);

  const teste = async () => {
    const minhaPesquisa = await handleGetAgenda(
      "agenda",
      "dataDia",
      "==",
      moment(agendaDate).format("YYYY-MM-DD"),
      "dataHorario",
      "==",
      horario.id,
      "quadra",
      "==",
      quadraClick.id
    );

    console.log("minhaPesquisa", minhaPesquisa);
  };

  const handleGetAgenda = async (
    collectionName,
    campo1,
    type1,
    valor1,
    campo2,
    type2,
    valor2,
    campo3,
    type3,
    valor3
  ) => {
    const colRef = collection(db, collectionName);
    const q = query(
      colRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2),
      where(campo3, type3, valor3)
    );

    const unsb = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach(async (doc) => {
        if (doc.data()) {
          if (doc.data().user === "agendamentoCancelado") {
            setData(null);
          } else {
            setData({ ...doc.data(), id: doc.id });
            if (!doc.data().bloqueio) {
              const nomeMarc = await getNome(doc.data().user);
              setNome(nomeMarc);
            } else {
              setBloqueio(doc.data().bloqueio);
            }
          }
        }
      });
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log("DATA", data);
  //   console.log("NOME", nome);
  // }, [data, nome]);

  const getNome = async (user) => {
    const nomeUser = await getDataId("users", user);
    return nomeUser;
  };

  return (
    <>
      {loading && <Loading type={`spin`} width={"30px"} />}
      {ModalOpen && (
        // {console.log('DATA', data)}
        <AdminMarcacaoModal
          title={
            data
              ? bloqueio
                ? "Bloqueado"
                : `Agendamento ${data.codLocacao}`
              : `Nova marcação`
          }
          isOpen={ModalOpen}
          setIsOpen={setModalOpen}
          data={
            data
              ? data
              : {
                  new: true,
                  dataDia: moment(agendaDate).format("YYYY-MM-DD"),
                  dataHorario: horario.id,
                  quadra: quadraClick.id,
                }
          }
          // tipoQuadra={id}
        />
      )}
      {console.log("DATABTN", data)}
      <button
        className={`btn btn-light btn-horarios ${data ? "btn-marc" : ""} ${
          data?.permanente ? "btn-permanente" : ""
        } ${data?.bloqueio && "btn-bloq"}`}
        onClick={() => setModalOpen(true)}
      >
        {/* {console.log("block", agendaDate, bloqueio)} */}
        {/* {data && bloqueio ? `Bloqueado` : horario.value} */}
        {data && bloqueio
          ? `Bloqueado`
          : nome
          ? `${nome.displayName} ${nome.sobrenome}`
          : horario.value}
      </button>
    </>
  );
};

export default ButtonHorarioAgenda;
