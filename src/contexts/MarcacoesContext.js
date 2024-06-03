import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import moment from "moment";
import useGetData from "../hooks/useGetData";

const MarcacoesContext = createContext();

export function MarcacoesProvider({ children }) {
    const [marcacoes, setMarcacoes] = useState({ dia: new Date(), marcacoes: [] });
    const {
        getDataId: getHorarioEscolhido,
        data: horarioEscolhido,
        loadingHorario,
    } = useGetData();


    useEffect(() => {
        getMarcacaoes()
        return () => { }
    }, []);

    // useEffect(() => {
    //     console.log('MARCACOES', marcacoes)
    //     return () => { }
    // }, [marcacoes])

    const getMarcacaoes = async () => {
        const res = await handleUpdateMarcacoes()
        let dados = { ...marcacoes }
        dados.marcacoes = res
        setMarcacoes(dados)
    }

    const handleGetStartTime = async (dia, hora) => {
        return moment(`${dia} ${hora?.value}:00`)
    }

    const handleGetEndTime = async (dia, hora) => {
        return moment(`${dia} ${hora?.value}:00`).add(1, 'hour')
    }

    const handleGetHorario = async (id_hora) => {
        let hora = "";
        hora = await getHorarioEscolhido('horarios', id_hora)
        return hora
    }


    const handleUpdateMarcacoes = async () => {
        const colRef = collection(db, 'agenda');
        const q = query(colRef, where('dataDia', '>=', moment(marcacoes.dia).add(-2, 'day').format('YYYY-MM-DD')), where('dataDia', '<=', moment(marcacoes.dia).add(2, 'day').format('YYYY-MM-DD')));
        let item = [...marcacoes.marcacoes]
        const unsb = onSnapshot(q, (querySnapshot) => {
            // querySnapshot.forEach(async (doc) => {
            //     if (doc.data()) {
            //         item.push({ ...doc.data(), id: doc.id })
            //     }
            // });
            querySnapshot.docChanges().forEach(async (change) => {
                if (change.type === "added") {
                    const hora = await handleGetHorario(change.doc.data().dataHorario)
                    const start = await handleGetStartTime(change.doc.data().dataDia, hora)
                    const end = await handleGetEndTime(change.doc.data().dataDia, hora)
                    console.log('NOVO')
                    item.push({
                        ...change.doc.data(),
                        id: change.doc.id,
                        start: start,
                        end: end,
                        title: change.doc.data().jogadores[0].name
                    })
                    // console.log(change.doc.data())
                }
                if (change.type === "modified") {
                    console.log('MODIFICADO')
                    // console.log(change.doc.data())
                    const objIndex = item.findIndex(obj => obj.id == change.doc.id);
                    item[objIndex] = { ...change.doc.data(), id: change.doc.id }
                    // console.log('objIndex', objIndex)
                }

                if (change.type === "removed") {
                    let filtered = item.filter(function (el) {
                        return el.id != change.doc.id;
                    })
                    item = filtered
                }

            });
            console.log('ITEM', item)
            let dados = { ...marcacoes }
            dados.marcacoes = item
            setMarcacoes(dados)
        });
        console.log('TESTEAAA')
        return item
    }

    const handleGetMarcacoes = async () => {
        const colRef = collection(db, 'agenda');
        const q = query(colRef, where('dataDia', '>=', moment(marcacoes.dia).add(-2, 'day').format('YYYY-MM-DD')), where('dataDia', '<=', moment(marcacoes.dia).add(2, 'day').format('YYYY-MM-DD')));
        let item = []
        const unsb = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                if (doc.data()) {
                    item.push({ ...doc.data(), id: doc.id })
                }
            });
        });
        return item
    }


    return (
        <MarcacoesContext.Provider value={{ marcacoes, setMarcacoes }}>
            {children}
        </MarcacoesContext.Provider>
    );
}

export default MarcacoesContext;