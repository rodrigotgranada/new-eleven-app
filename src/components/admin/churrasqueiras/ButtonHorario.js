import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import ChurrasqueiraContext from "../../../contexts/ChurrasqueiraContext";
import useGetData from "../../../hooks/useGetData";
import MarcacaoChurras from "./modal/MarcacaoChurras";
import Loading from "../../public/Loading/Loading";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

const ButtonHorario = ({ index, type, churrasqueira }) => {
  const { churrasqueiraDate, setChurrasqueiraDate } =
    useContext(ChurrasqueiraContext);
  const {
    getDataButtonsAgendas: getMarcacoes,
    data: marcacoes,
    loading: carregaMarcacoes,
  } = useGetData();

  const { getDataId: getUser, data: user, loading: carregaUser } = useGetData();
  const { getDataId } = useGetData();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [meuUser, setMeuUser] = useState(null);
  const [bloqueio, setBloqueio] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    teste();
    return () => {
      resetForm();
    };
  }, [churrasqueiraDate]);

  const resetForm = () => {
    setMeuUser(null);
    setData(null);
    setBloqueio(null);
  };

  const teste = async () => {
    const minhaPesquisa = await handleGetAgenda(
      "agenda_churras",
      "dataDia",
      "==",
      moment(churrasqueiraDate).format("YYYY-MM-DD"),
      "dataHorario",
      "==",
      type.value,
      "churrasqueira",
      "==",
      churrasqueira.id
    );
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
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          console.log("removed", change.doc.data());
          resetForm();
        }
      });
      querySnapshot.docs.forEach(async (doc) => {
        if (doc.data()) {
          setData({ ...doc.data(), id: doc.id });
          if (!doc.data().bloqueio) {
            if (doc.data().tipoMarc === "usuario") {
              const nomeMarc = await getNome(doc.data().user);
              setMeuUser(nomeMarc);
            }
          } else {
            setBloqueio(doc.data().bloqueio);
          }
        }
      });
    });
    setLoading(false);
  };

  const getNome = async (user) => {
    const nomeUser = await getDataId("users", user);
    return nomeUser;
  };

  // useEffect(() => {
  //   console.log("user", user);
  //   console.log("bloqueio", bloqueio);
  // }, [user, bloqueio]);

  const handleButtonName = () => {
    let nome = type?.display;
    if (bloqueio) {
      nome = `BLOQUEADO`;
    }
    if (data) {
      if (data.tipoMarc === "avulso") {
        nome = `${data?.user?.nome}`;
      }
    }

    if (meuUser && Object.keys(meuUser).length > 0) {
      // data.tipoMarc === "usuario"
      nome = `${meuUser.displayName} ${meuUser.sobrenome}`;
    }

    return nome;
  };

  return (
    <>
      {modalOpen && (
        <MarcacaoChurras
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          infos={{
            type: type,
            churrasqueira: churrasqueira,
            bloqueio: bloqueio,
            config: data ? data : null,
            user: meuUser ? meuUser : [],
          }}
        />
      )}
      <button
        key={index}
        type="button"
        className="btn btn-primary"
        onClick={() => setModalOpen(true)}
      >
        {loading && <Loading type={`spin`} width={"30px"} />}
        {handleButtonName()}
      </button>
    </>
  );
};

// Object.keys(user).length > 0
//             ? `${user.displayName} ${user.sobrenome}`
//             : marcacoes[0].tipoMarc === "avulso"
//             ? `${marcacoes[0]?.user?.nome}`
//             : type.display

export default ButtonHorario;
