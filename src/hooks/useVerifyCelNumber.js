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
import ChangeCel from "../pages/private/profile/ChangeCel";
import useWhatsappApi from "./useWhatsappApi";

const useVerifyCelNumber = () => {
  const [data, setData] = useState({ data: null, error: null });
  const [loading, setLoading] = useState(true);
  const { sendConfirmPT } = useWhatsappApi();

  const verifyFunc = async (userId) => {
    setLoading(true);
    console.log(userId);

    const colletionRef = collection(db, "codTemp_celChange");
    const q = query(colletionRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    let items = null;
    querySnapshot.forEach((doc) => {
      items = { ...doc.data(), id: doc.id };
    });

    console.log(items);

    if (items) {
      const currentTime = moment();
      const isWithinRange = isTimeInRange(
        currentTime,
        items.createAt,
        items.validate
      );
      currentTime.isBetween(
        moment(items.createAt, "DD/MM/YYYY HH:mm"),
        moment(items.validate, "DD/MM/YYYY HH:mm")
      );
      console.log(isWithinRange);
      if (isWithinRange) {
        return items;
      } else {
        await deleteDoc(doc(db, "codTemp_celChange", items.id));
      }
    } else {
    }
  };

  const cancelChangeFunc = async (userId) => {
    const colletionRef = collection(db, "codTemp_celChange");
    const q = query(colletionRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    let item = null;
    querySnapshot.forEach((doc) => {
      item = { ...doc.data(), id: doc.id };
    });
    console.log("item", item);
    try {
      await deleteDoc(doc(db, "codTemp_celChange", item.id));
      // toast.success("Troca cancelada com sucesso!");
      toast.success("Troca cancelada com sucesso!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const isTimeInRange = (currentTime, startTime, endTime) => {
    const start = moment(startTime, "DD/MM/YYYY HH:mm");
    const end = moment(endTime, "DD/MM/YYYY HH:mm");

    return currentTime.isBetween(start, end);
  };

  const checkCelFunc = async (tempCel, userId) => {
    try {
      const colletionRef1 = collection(db, "users");
      const q1 = query(colletionRef1, where("telefone", "==", tempCel));

      const querySnapshot1 = await getDocs(q1);
      let resultado = null;
      querySnapshot1.forEach((doc) => {
        resultado = { ...doc.data(), id: doc.id };
      });
      console.log(resultado);
      if (resultado) {
        let verify = { ...data };
        verify[`error`] = "Telefone já existe";
        setData(verify);
        return verify;
      } else {
        let verify = { ...data };
        verify[`error`] = null;
        setData(verify);

        try {
          try {
            const codAuth = Math.floor(Math.random() * 900000) + 100000;
            const docRef = collection(db, "codTemp_celChange");
            await addDoc(docRef, {
              code: codAuth,
              createAt: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
              tempCel: tempCel,
              user_id: userId,
              validate: moment(new Date())
                .add(1, "hours")
                .format("DD/MM/YYYY HH:mm:ss"),
            }).then(async (e) => {
              // console.log(e);
              const enviado = await sendConfirmPT(tempCel, codAuth);

              console.log("enviado", enviado);

              if (enviado) {
                toast.success("Troca de número solicitada! Código enviado!", {
                  position: toast.POSITION.BOTTOM_CENTER,
                });
              } else {
                toast.error("Código não enviado!", {
                  position: toast.POSITION.BOTTOM_CENTER,
                });
              }
              // toast.success("Troca de número solicitada!");
            });
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeCelFunc = async (userId, newNumber) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        telefone: newNumber,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const changeCelConcluidoFunc = async (userId) => {
    const colletionRef = collection(db, "codTemp_celChange");
    const q = query(colletionRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    let item = null;
    querySnapshot.forEach((doc) => {
      item = { ...doc.data(), id: doc.id };
    });
    console.log("item", item);
    try {
      await deleteDoc(doc(db, "codTemp_celChange", item.id));
      // toast.success("Troca efetuada com sucesso!");
      toast.success("Troca efetuada com sucesso!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return {
    verifyFunc,
    checkCelFunc,
    cancelChangeFunc,
    changeCelFunc,
    changeCelConcluidoFunc,
  };
};

export default useVerifyCelNumber;
