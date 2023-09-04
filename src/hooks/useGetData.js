import {
  collection,
  doc,
  documentId,
  getDoc,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const useGetData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const collectionRef = collection(db, collectionName);

  const getData = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    await onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  };

  const getDataId = async (collectionName, id) => {
    const colletionRef = doc(db, collectionName, id);
    const docSnap = await getDoc(colletionRef);

    setData(docSnap.data());
    setLoading(false);
    return docSnap.data();
  };

  const getDataOrderBy = async (collectionName, campo, order) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      orderBy(campo.toLowerCase(), order ? order.toLowerCase() : "asc")
    );

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
      setLoading(false);
    });
  };

  const getDataOrderBy2 = async (
    collectionName,
    campo1,
    order1,
    campo2,
    order2
  ) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      orderBy(campo1.toLowerCase(), order1 ? order1.toLowerCase() : "asc"),
      orderBy(campo2.toLowerCase(), order2 ? order2.toLowerCase() : "asc")
    );

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
      setLoading(false);
    });
  };

  const getDataWhere = async (collectionName, campo, type, valor) => {
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, or(where(campo.toLowerCase(), type, valor)));

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setData(items);
      setLoading(false);
      return items;
    });
  };

  const getDataWhereId = async (collectionName, type, valor) => {
    console.log("valor", valor);
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, where(documentId(), type, valor));
    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        console.log("querySnapshot", doc.data());
        items.push({ ...doc.data(), id: doc.id });
      });

      setData(items);
      setLoading(false);
      return items;
    });
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

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setData(items);
      setLoading(false);
      return items;
    });
  };

  const getDataWhereOrderByLimit = async (
    collectionName,
    campo,
    type,
    valor,
    orderCampo,
    order,
    quantidade
  ) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo.toLowerCase(), type, valor),
      orderBy(orderCampo, order ? order.toLowerCase() : "asc"),
      limit(quantidade ? quantidade : 10000)
    );

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setData(items);

      setLoading(false);
      return items;
    });
  };

  return {
    getDataWhereId,
    getDataWhere3,
    getDataOrderBy2,
    getDataWhereOrderByLimit,
    getDataId,
    getDataWhere,
    getData,
    getDataOrderBy,
    data,
    loading,
  };
};

export default useGetData;
