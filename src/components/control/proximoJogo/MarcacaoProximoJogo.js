import React, { useContext, useEffect } from 'react'
import useGetData from '../../../hooks/useGetData';
import ControlContext from '../../../contexts/ControlContext';
import moment from 'moment';

const MarcacaoProximoJogo = ({ hora, quadra }) => {
    // console.log('hora', hora)
    // console.log('quadra', quadra)
    const { controlDate, setControlDate } = useContext(ControlContext);
    const {
        getDataButtonsAgendas2: getMarcacao,
        data: marcacao,
        loading: carregaMarcacao,
    } = useGetData();

    useEffect(() => {
        console.log(moment(controlDate).format("YYYY-MM-DD"), quadra?.id, hora?.id)
        getMarcacao("agenda", "dataDia", "==", moment(controlDate).format("YYYY-MM-DD"), "quadra", "==", quadra?.id, "dataHorario", "==", hora?.id)
        return () => { }
    }, [controlDate])

    const response = (marc) => {
        console.log(marc)

        let texto = hora.value
        if (Object.keys(marc).length > 0) {
            texto = "MARCADO"
        }
        return <div className='fixed-name'> <span>{texto}</span></div>
    }
    return (
        <>
            {response(marcacao)}
        </>
    )
}

export default MarcacaoProximoJogo