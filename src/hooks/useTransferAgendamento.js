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

  const checkTransfer = async (transferID) => {
    try {
      let resultado = null;
      const colletionRef = doc(db, "codTemp_transferAgenda", transferID);
      const docSnap = await getDoc(colletionRef);
      resultado = docSnap.data();

      if (resultado) {
        let verify = { ...data };
        verify[`data`] = {
          code: resultado.code,
          locacao: resultado.locacaoID,
          id: transferID,
          telefone: resultado.destinoCel,
        };
        verify[`error`] = "Transferencia já existe";
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

  const cancelTransfer = async (transferID) => {
    try {
      const item = await checkTransfer(transferID);
      if (item && item.data) {
        try {
          await deleteDoc(doc(db, "codTemp_transferAgenda", transferID)).then(
            async (e) => {
              try {
                const userRef = doc(db, "agenda", item?.data?.locacao);
                await updateDoc(userRef, {
                  transfer_id: null,
                }).then(async (e) => await checkTransfer(transferID));
                return e?.id;
              } catch (err) {
                console.log(err);
              }
            }
          );
          // toast.success("Troca cancelada com sucesso!");
          toast.success("Transferencia cancelada com sucesso!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTransfer = async (
    codLocacao,
    userOrigem,
    userDestino,
    agendaID,
    jogadores,
    marcacao
  ) => {
    console.log(
      codLocacao,
      userOrigem,
      userDestino,
      agendaID,
      jogadores,
      marcacao
    );
    try {
      const codAuth = Math.floor(Math.random() * 900000) + 100000;
      const docRef = collection(db, "codTemp_transferAgenda");
      const cadastro = await addDoc(docRef, {
        locacaoID: agendaID,
        codLocacao: codLocacao,
        userOrigem: userOrigem?.uid,
        userDestino: userDestino?.uid,
        createAt: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
        code: codAuth,
        status: "pendente",
        destinoCel: userDestino?.telefone,
        validate: marcacao?.dataDia,
        jogadores: jogadores,
      }).then(async (e) => {
        if (e?.id) {
          try {
            const userRef = doc(db, "agenda", agendaID);
            await updateDoc(userRef, {
              transfer_id: e?.id,
            });
          } catch (err) {
            console.log(err);
          }
          toast.success("Transferencia solicitada!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          const enviado = await sendConfirmPT(userDestino?.telefone, codAuth);
          console.log("enviado", enviado);

          if (enviado) {
            toast.success("Código enviado!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          } else {
            toast.error("Código não enviado!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
          return e?.id;
        } else {
          toast.error("Transferencia não solicitada!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
      return cadastro;
      // console.log("cadastro", cadastro);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const acceptTransfer = async (transfer, players) => {
    try {
      const userRef = doc(db, "agenda", transfer?.locacaoID);
      await updateDoc(userRef, {
        transfer_id: null,
        permanente: false,
        permanente_id: "",
        user: transfer?.userDestino,
      }).then(async (e) => {
        await cancelTransfer(transfer?.id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const adminCheckAgenda = async (agendaID) => {
    try {
      let resultado = null;
      const colletionRef = doc(db, "agenda", agendaID);
      const docSnap = await getDoc(colletionRef);
      resultado = docSnap.data();
      setLoading(false);
      return resultado;
    } catch (err) {
      console.log(err);
    }
  };
  const adminTransfer = async (agenda, selUser, jogadores) => {
    const agendamento = await adminCheckAgenda(agenda?.id);
    if (agendamento) {
      try {
        const userRef = doc(db, "agenda", agenda?.id);
        return await updateDoc(userRef, {
          transfer_id: null,
          permanente: false,
          permanente_id: "",
          user: selUser?.uid,
        }).then(async (e) => {
          agenda?.transfer_id && (await cancelTransfer(agenda?.transfer_id));
          return true;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  };

  return {
    checkTransfer,
    createTransfer,
    cancelTransfer,
    acceptTransfer,
    adminTransfer,
    data,
    loading,
  };
};

export default useTransferAgendamento;
