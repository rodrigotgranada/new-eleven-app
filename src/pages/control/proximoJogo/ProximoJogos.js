import React from 'react'
import ContentProximoJogo from '../../../components/control/proximoJogo/ContentProximoJogo'
import { ControlProvider } from '../../../contexts/ControlContext'
import { MarcacoesProvider } from '../../../contexts/MarcacoesContext'

const ProximoJogos = () => {
    return (
        <ControlProvider>
            <MarcacoesProvider>
                <ContentProximoJogo />
            </MarcacoesProvider>
        </ControlProvider>

    )
}

export default ProximoJogos