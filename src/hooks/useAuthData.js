import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const useAuthData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const addData = async () => {};

  const getDataId = async (collectionName, id) => {
    const colletionRef = doc(db, collectionName, id);
    const docSnap = await getDoc(colletionRef);

    setData(docSnap.data());
    setLoading(false);
    return docSnap.data();
  };
  const getDataWhere = async (collectionName, campo1, type1, valor1) => {
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, where(campo1, type1, valor1));

    const querySnapshot = await getDocs(q);
    let items = null;
    querySnapshot.forEach((doc) => {
      items = { ...doc.data(), id: doc.id };
    });

    setLoading(false);
    return items;
  };

  const getDataWhere2 = async (
    collectionName,
    campo1,
    type1,
    valor1,
    campo2,
    type2,
    valor2
  ) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2)
    );

    const querySnapshot = await getDocs(q);
    let items = null;
    querySnapshot.forEach((doc) => {
      items = { ...doc.data(), id: doc.id };
    });

    setLoading(false);
    return items;
  };

  const getDataWhere3 = async (
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
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2),
      where(campo3, type3, valor3)
    );

    const querySnapshot = await getDocs(q);
    let items = null;
    querySnapshot.forEach((doc) => {
      items = { ...doc.data(), id: doc.id };
    });

    setLoading(false);
    return items;
  };

  return { loading, getDataId, getDataWhere, getDataWhere2, getDataWhere3 };
};
export default useAuthData;
