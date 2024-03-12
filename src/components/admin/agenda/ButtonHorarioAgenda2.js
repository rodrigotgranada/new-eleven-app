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

const ButtonHorarioAgenda2 = ({ horario, dataClick, quadraClick, type }) => {
  const { currentUser } = useAuth();
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);
  const [ModalOpen, setModalOpen] = useState(false);
  // const {
  //   getDataSnapAttButtonAgenda: getAgendamento,
  //   data: agendamento,
  //   loading: carregaAgendamento,
  // } = useGetData();

  const { getDataId: getUser, data: user, loading: carregaUser } = useGetData();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [nome, setNome] = useState(null);
  const [bloqueio, setBloqueio] = useState(false);

  const {
    getDataButtonsAgendas: getMarcacoes,
    data: marcacoes,
    loading: carregaMarcacoes,
  } = useGetData();

  useEffect(() => {
    console.log("oi2");
    if (!data) {
      setNome(null);
      setData(null);
      setBloqueio(null);
      setAgendaDate(agendaDate);
    }
    // teste();
  }, [data]);

  useEffect(() => {
    console.log("oi");
    getMarcacoes(
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

    return () => {};
  }, [agendaDate]);

  useEffect(() => {
    console.log("oi3");
    // console.log("marcacoes", marcacoes);
    if (Object.keys(marcacoes).length > 0) {
      // console.log("marcacoes", marcacoes[0].tipoMarc);
      if (marcacoes[0].tipoMarc === "usuario") {
        getUser("users", marcacoes[0].user);
      }
      if (marcacoes[0].tipoMarc === "avulso") {
        // console.log("users", marcacoes[0].user);
      }
    } else {
      console.log("aqui da ");
    }

    return () => {};
  }, [marcacoes]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // const teste = async () => {
  //   const minhaPesquisa = await handleGetAgenda(
  //     "agenda",
  //     "dataDia",
  //     "==",
  //     moment(agendaDate).format("YYYY-MM-DD"),
  //     "dataHorario",
  //     "==",
  //     horario.id,
  //     "quadra",
  //     "==",
  //     quadraClick.id
  //   );
  // };

  // const handleGetAgenda = async (
  //   collectionName,
  //   campo1,
  //   type1,
  //   valor1,
  //   campo2,
  //   type2,
  //   valor2,
  //   campo3,
  //   type3,
  //   valor3
  // ) => {
  //   const colRef = collection(db, collectionName);
  //   const q = query(
  //     colRef,
  //     where(campo1, type1, valor1),
  //     where(campo2, type2, valor2),
  //     where(campo3, type3, valor3)
  //   );

  //   const unsb = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.docs.forEach(async (doc) => {
  //       if (doc.data()) {
  //         if (doc.data().user === "agendamentoCancelado") {
  //           setData(null);
  //         } else {
  //           setData({ ...doc.data(), id: doc.id });
  //           if (!doc.data().bloqueio) {
  //             const nomeMarc = await getNome(doc.data().user);
  //             setNome(nomeMarc);
  //           } else {
  //             setBloqueio(doc.data().bloqueio);
  //           }
  //         }
  //       }
  //     });
  //   });
  //   setLoading(false);
  // };

  // const getNome = async (user) => {
  //   const nomeUser = await getDataId("users", user);
  //   return nomeUser;
  // };

  const handleButtonName = () => {
    let nome = type?.display;
    if (Object.keys(marcacoes).length > 0) {
      if (marcacoes[0].tipoMarc === "bloqueio") {
        nome = `BLOQUEADO`;
      }
      if (marcacoes[0].tipoMarc === "avulso") {
        nome = `${marcacoes[0]?.user?.nome}`;
      }
    }
    if (user && Object.keys(user).length > 0) {
      marcacoes[0].tipoMarc === "usuario"
        ? (nome = `${user.displayName} ${user.sobrenome}`)
        : (nome = type?.display);
    }

    return nome;
  };

  return (
    <>
      {carregaMarcacoes && <Loading type={`spin`} width={"30px"} />}
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
                  type: type.id,
                }
          }
          // tipoQuadra={id}
        />
      )}

      <button
        className={`btn btn-light btn-horarios ${data ? "btn-marc" : ""} ${
          data?.permanente ? "btn-permanente" : ""
        } ${data?.bloqueio && "btn-bloq"}`}
        onClick={() => setModalOpen(true)}
      >
        {data && bloqueio
          ? `Bloqueado`
          : nome
          ? `${nome.displayName} ${nome.sobrenome}`
          : data?.singleMarc
          ? data?.jogadores[0].name
          : horario.value}
      </button>
    </>
  );
};

export default ButtonHorarioAgenda2;
