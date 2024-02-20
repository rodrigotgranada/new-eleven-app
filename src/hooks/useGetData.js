import {
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
    const itens = [];
    await onSnapshot(collectionRef, (snapshot) => {
      itens.push(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    return itens;
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

  const getDataOrderByTeste = async (collectionName, campo, order) => {
    const colletionRef = collection(db, collectionName);
    const q = query(
      colletionRef,
      orderBy(campo, order ? order.toLowerCase() : "asc")
    );

    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          console.log("removed", change.doc.data());
        }
      });

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
      // console.log("items", items);
      setData(items);
      setLoading(false);
      return items;
    });
  };

  const getDataWhereSimple = async (collectionName, campo, type, valor) => {
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, or(where(campo, type, valor)));

    await onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      // console.log("items", items);
      setData(items);
      setLoading(false);
      return items;
    });
  };

  const getDataWhereQuadra = async (collectionName, campo, type, valor) => {
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, or(where(campo.toLowerCase(), type, valor)));
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      // console.log("items", items);
    });
    setData(items);
    setLoading(false);
    return items;
  };

  const getDataWhereId = async (collectionName, type, valor) => {
    const colletionRef = collection(db, collectionName);
    const q = query(colletionRef, where(documentId(), type, valor));
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
    });
    setData(items);
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
    // console.log("loading", loading);
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
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      // console.log("getDataWhere4", items);
    });
    setData(items);
    setLoading(false);
    return items;
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
    const items = [];
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
    });
    setData(items);

    setLoading(false);
    return items;
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

  const getDataSnapAtt = async (
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
    // console.log(
    //   "SNAP",
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
    // );

    const colRef = collection(db, collectionName);
    const q = query(
      colRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2)
      // where(campo3, type3, valor3)
    );
    //real time update
    const items = [];
    const unsb = onSnapshot(q, (querySnapshot) => {
      console.log("onsnap", querySnapshot.docs);
      querySnapshot.docs.forEach((doc) => {
        items.push(doc.data());
        console.log("DATA", doc.data());
      });
    });
    setLoading(false);
    setData(items);
    return items;
    // onSnapshot(
    //   colRef,
    //   where(campo1, type1, valor1),
    //   where(campo2, type2, valor2),
    //   // where(campo3, type3, valor3),
    //   (snapshot) => {
    //     // let items = {};
    //     snapshot.docs.forEach((doc) => {
    //       // setTestData((prev) => [...prev, doc.data()])
    //       console.log("onsnapshot", doc.data());
    //       // items = doc.data();
    //       // console.log("items", items);
    //       // if (Object.keys(items).length > 0) {
    //       //   setData(items);
    //       // }
    //     });
    //   }
    // );
  };

  const getDataSnapAttButtonAgenda = async (
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
    console.log(
      "PESQUISA",
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
    );
    const colRef = collection(db, collectionName);
    const q = query(
      colRef,
      where(campo1, type1, valor1),
      where(campo2, type2, valor2),
      where(campo3, type3, valor3)
    );
    //real time update
    const items = [];
    const unsb = onSnapshot(q, (querySnapshot) => {
      console.log("onsnap", querySnapshot.docs);
      querySnapshot.docs.forEach((doc) => {
        items.push(doc.data());
        console.log("DATA", doc.data());
      });
    });
    setLoading(false);
    setData(items);
    return items;
  };

  const deletePermanente = async (id) => {
    let retorno = "";
    const colletionRef = collection(db, "agenda");
    const q = query(colletionRef, where("permanente_id", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot?.empty) {
        retorno = false;
      } else {
        querySnapshot.forEach(async (doc) => {
          const ref = doc.ref;
          await updateDoc(ref, {
            user: "agendamentoCancelado",
          }).then((e) => {
            deleteDoc(ref).then((e) => {
              console.log(`Agendamento excluido com sucesso!!`);
            });
          });
        });
        setLoading(false);
        retorno = true;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      retorno = false;
    }

    if (retorno) {
      const docRef = doc(db, "permanentes", id);

      await deleteDoc(docRef).then((e) => {
        console.log(`Permanente excluido com sucesso!!`);
      });
    }

    console.log("retorno", retorno);
    return retorno;
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
    getDataWhereSimple,
    getDataWhereQuadra,
    getData,
    getDataOrderBy,
    getDataOrderByTeste,
    getDataAgenda,
    getDataSnapAtt,
    getDataSnapAttButtonAgenda,
    deletePermanente,
    data,
    loading,
  };
};

export default useGetData;
