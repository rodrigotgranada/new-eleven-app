import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import moment from "moment";

const ControlContext = createContext();

export function ControlProvider({ children }) {
    const [grupos, setGrupos] = useState({ dia: new Date(), grupos: [] });
    useEffect(() => {
        getUpdates()
        return () => { }
    }, []);

    // useEffect(() => {
    //     console.log('DATA', grupos)
    //     return () => { }
    // }, [grupos])


    const getUpdates = async () => {
        const res = await handleUpdateQuadra()
        // console.log('UPDATE res', res)
        let dados = { ...grupos }
        dados.grupos = res
        setGrupos(dados)
    }

    const handleUpdateQuadra = async () => {
        const colRef = collection(db, 'quadras');
        const q = query(colRef, orderBy('type', 'desc'), orderBy('numero', 'asc'));
        let item = [];
        const unsb = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // const newItem = { ...data }
                    // newItem.grupos = [...newItem.grupos, change.doc.data()]
                    // setData(newItem)
                    item.push({
                        ...change.doc.data(),
                        id: change.doc.id,
                        title: `${change.doc.data().name} (${change.doc.data().numero})`
                    })
                }
                if (change.type === "removed") {
                    console.log("removed", change.doc.data());
                }
            });
        });
        return item
    }

    const handleGetQuadras = async () => {
        const colRef = collection(db, 'quadras');
        const q = query(colRef);
        let item = []
        const unsb = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docs.forEach(async (doc) => {
                if (doc.data()) {
                    item.push({ ...doc.data(), id: doc.id })
                }
            });
        });
        // console.log('quadras', item)
        return item
    }

    return (
        <ControlContext.Provider value={{ grupos, setGrupos }}>
            {children}
        </ControlContext.Provider>
    );
}

export default ControlContext;