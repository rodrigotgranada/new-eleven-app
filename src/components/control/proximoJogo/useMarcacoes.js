import React, { useState, useEffect } from 'react'
// import React { useEffect }from 'react'
import moment from 'moment'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../../firebase';

const useMarcacoes = () => {
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);


    let teste = (function () {
        const colRef = collection(db, 'quadras');
        const q = query(colRef);
        let item = []
        const unsb = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                console.log("changed", change.doc.data());
            });
            querySnapshot.docs.forEach(async (doc) => {
                if (doc.data()) {
                    item.push({ ...doc.data(), id: doc.id })

                }
            });
        });
        console.log(item)
        return item
    })();
    console.log(teste)
    console.log(Object.keys(teste).length)
    // const getGroups = async (collectionName) => {
    //     const colRef = collection(db, collectionName);
    //     const q = query(colRef);
    //     const item = []
    //     const unsb = onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.docChanges().forEach((change) => {
    //             if (change.type === "removed") {
    //                 console.log("removed", change.doc.data());
    //             }
    //         });
    //         querySnapshot.docs.forEach(async (doc) => {
    //             if (doc.data()) {
    //                 item.push(doc.data())

    //             }
    //         });
    //     });
    //     setGroups(item)
    // }

    // getGroups('quadras')



    return { loading, groups, items };
}
export default useMarcacoes;