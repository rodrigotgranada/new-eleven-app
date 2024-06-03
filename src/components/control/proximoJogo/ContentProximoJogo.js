import React, { useContext, useEffect } from 'react'
import ControlContext from '../../../contexts/ControlContext';
import "./../../../styles/control/controlProximoJogo.scss"
import { useState } from 'react';
import MarcacoesContext from '../../../contexts/MarcacoesContext';
import QuadroAgendamento from './QuadroAgendamento';

const ContentProximoJogo = () => {
    const { grupos, setGrupos } = useContext(ControlContext);
    const { marcacoes, setMarcacoes } = useContext(MarcacoesContext);
    const [joined, setJoined] = useState({})

    useEffect(() => {
        setJoined({ ...grupos, ...marcacoes })
        return () => { }
    }, [grupos, marcacoes])

    useEffect(() => {
        console.log('joined', joined)
        return () => { }
    }, [joined])


    return (
        <>

            {/* {load && <Loading type={`spin`} width={"30px"} />} */}
            {joined && Object.keys(joined).length > 0 && <QuadroAgendamento dia={marcacoes?.dia} items={marcacoes?.marcacoes} groups={grupos?.grupos} />}
            {/* <QuadroAgendamento items={marcacoes} groups={grupos} /> */}
        </>
    )
}

export default ContentProximoJogo