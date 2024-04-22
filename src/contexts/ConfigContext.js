import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [configFull, setConfigFull] = useState(null);
  // const [loader, setLoader] = useState(true);
  useEffect(() => {
    getConfigs()
  }, []);

  const getConfigs = async () => {
    const colRef = collection(db, 'configs');
    const q = query(
      colRef
    );
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setConfigFull({ ...doc.data(), id: doc.id });
      });
      querySnapshot.docChanges().forEach((change) => {
        setConfigFull({...change.doc.data(), id: change.doc.id})
      });
    });
  }


  return (
    <ConfigContext.Provider value={{ configFull, setConfigFull }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigContext;
