import React, { useEffect } from 'react'
// import React { useEffect }from 'react'
import moment from 'moment'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../../firebase';

const item = []
const handleGetGroups = async (collectionName) => {
    const colRef = collection(db, collectionName);
    const q = query(colRef);
    const unsb = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
                console.log("removed", change.doc.data());
            }
        });
        querySnapshot.docs.forEach(async (doc) => {
            if (doc.data()) {
                item.push(doc.data())
                // console.log(doc.data())
            }
        });
    });
}

handleGetGroups('quadras')

console.log(item)
if (item.length > 0) {
    console.log('Entrei')
}

export const groups = [
    { id: 1, title: 'Petry' },
    { id: 2, title: 'Joao' },
    { id: 3, title: 'Teste' },
    { id: 4, title: 'group 4' },
    { id: 5, title: 'group 5' },
    { id: 6, title: 'group 6' },
    { id: 7, title: 'group 7' },
    { id: 8, title: 'group 8' },
    { id: 9, title: 'group 9' },
    { id: 10, title: 'group 10' },
    { id: 11, title: 'group 11' },
    { id: 12, title: 'group 12' },
    { id: 13, title: 'group 13' },
    { id: 14, title: 'group 14' },
    { id: 15, title: 'group 15' },
    { id: 16, title: 'group 16' },
    { id: 17, title: 'group 17' },
    { id: 18, title: 'group 18' },
]
export const items = [
    {
        id: 1,
        group: 1,
        title: 'Maicon',
        start: moment('2024-05-06 23:00'),
        end: moment(`2024-05-06 23:00`).add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start: moment('2024-05-06 21:00'),
        end: moment(`2024-05-06 21:00`).add(1, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'Joãozinho',
        start: moment('2024-05-06 19:00'),
        end: moment(`2024-05-06 19:00`).add(1, 'hour')
    }
]