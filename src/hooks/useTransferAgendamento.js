import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import moment from "moment";
import { toast } from "react-toastify";
import useWhatsappApi from "./useWhatsappApi";

const useTransferAgendamento = () => {
  const [data, setData] = useState({ data: null, error: null });
  const [loading, setLoading] = useState(true);
  const { sendConfirmPT } = useWhatsappApi();

  const checkTransfer = async (codLocacao) => {
    try {
      const colletionRef1 = collection(db, "codTemp_transferAgenda");
      const q1 = query(colletionRef1, where("codLocacao", "==", codLocacao));

      const querySnapshot1 = await getDocs(q1);
      let resultado = null;
      querySnapshot1.forEach((doc) => {
        resultado = { ...doc.data(), id: doc.id };
      });
      console.log(resultado);
      if (resultado) {
        let verify = { ...data };
        verify[`data`] = {
          code: resultado.code,
          id: resultado.id,
          telefone: resultado.destinoCel,
        };
        verify[`error`] = "Transferencia já existe";
        // verify[`id`] = resultado.id;
        setData(verify);
        return verify;
      } else {
        let verify = { ...data };
        verify[`error`] = null;
        setData(verify);
        return verify;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelTransfer = async (codLocacao) => {
    try {
      const item = await checkTransfer(codLocacao);
      console.log("teste", item);
      try {
        await deleteDoc(doc(db, "codTemp_transferAgenda", item?.data?.id)).then(
          async (e) => await checkTransfer(codLocacao)
        );
        // toast.success("Troca cancelada com sucesso!");
        toast.success("Transferencia cancelada com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTransfer = async (
    codLocacao,
    userOrigem,
    userDestino,
    jogadores
  ) => {
    console.log(codLocacao, userOrigem, userDestino, jogadores);
    try {
      const codAuth = Math.floor(Math.random() * 900000) + 100000;
      const docRef = collection(db, "codTemp_transferAgenda");
      await addDoc(docRef, {
        codLocacao: codLocacao,
        userOrigem: userOrigem?.uid,
        userDestino: userDestino?.uid,
        createAt: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
        code: codAuth,
        status: "pendente",
        destinoCel: userDestino?.telefone,
        validate: moment(new Date())
          .add(1, "hours")
          .format("DD/MM/YYYY HH:mm:ss"),
        jogadores: jogadores,
      }).then(async (e) => {
        console.log("e", e?.id);
        if (e?.id) {
          toast.success("Transferencia solicitada!", {
            position: toast.POSITION.TOP_CENTER,
          });
          const enviado = await sendConfirmPT(userDestino?.telefone, codAuth);
          console.log("enviado", enviado);

          if (enviado) {
            toast.success("Código enviado!", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Código não enviado!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          toast.error("Transferencia não solicitada!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return {
    checkTransfer,
    createTransfer,
    cancelTransfer,
    data,
    loading,
  };
};

export default useTransferAgendamento;
