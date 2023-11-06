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

const useGetData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const collectionRef = collection(db, collectionName);

  const getAllUsers = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    await onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  };

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

  const getDataWhereSnap = async (collectionName, campo, type, valor) => {
    const q = query(collection(db, collectionName), where(campo, type, valor));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
      });
      console.log("Current cities in CA: ", cities.join(", "));
      setData(cities);
      setLoading(false);
      return cities;
      // console.log("Current cities in CA: ", cities.join(", "));
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
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      console.log("items", items);
      setData(items);
      setLoading(false);
    });
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
    console.log("loading", loading);
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2),
      where(campo3, type3, valor3)
    );
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setData(items);
      setLoading(false);
    });
    return items;
  };

  const getDataWhere4 = async (
    collectionName,
    campo1,
    type1,
    valor1,
    campo2,
    type2,
    valor2,
    campo3,
    type3,
    valor3,
    campo4,
    type4,
    valor4
  ) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2),
      where(campo3, type3, valor3),
      where(campo4, type4, valor4)
    );

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      // console.log("getDataWhere4", items);
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

  const getDataWhereOrderByLimit2 = async (
    collectionName,
    campo,
    type,
    valor,
    campo1,
    type1,
    valor1,
    orderCampo,
    order,
    quantidade
  ) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      where(campo, type, valor),
      where(campo1, type1, valor1),
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

  const getDataAgenda = async (
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

  return {
    getAllUsers,
    getDataWhereId,
    getDataWhere2,
    getDataWhere3,
    getDataWhere4,
    getDataOrderBy2,
    getDataWhereOrderByLimit,
    getDataWhereOrderByLimit2,
    getDataId,
    getDataWhereSnap,
    getDataWhere,
    getData,
    getDataOrderBy,
    getDataAgenda,
    data,
    loading,
  };
};

export default useGetData;
