import React, { useEffect, useRef, useState } from 'react'
import { Form, FormGroup, Label } from 'reactstrap'
import MaskedInputCel from '../public/formComponents/MaskedInputCel'
import useVerifyCelNumber from '../../hooks/useVerifyCelNumber';
import { dividerClasses } from '@mui/material';

const UsuarioTelefone = ({ usuario }) => {
    console.log(usuario)
    const telefoneRef = useRef(usuario.telefone);
    const [error, setError] = useState(null);
    const [verify, setVerify] = useState("");
    const {
        verifyFunc,
        checkCelFunc,
        cancelChangeFunc,
        changeCelFunc,
        changeCelConcluidoFunc,
        checkCelFuncAdmin,
    } = useVerifyCelNumber();

    // useEffect(() => {
    //     console.log('telefoneRef', telefoneRef.current.value)

    //     return () => {

    //     }
    // }, [telefoneRef])



    const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, value } = telefoneRef.current;
        const teste = await checkCelFuncAdmin(onlyNumbers(value), usuario?.uid);
        console.log('teste', teste)
        setError(teste);
        // handleMessageVerify();
    };

    const handleMessageVerify = async () => {
        if (usuario) {
            const verificacao = await verifyFunc(usuario?.uid);
            setVerify(verificacao);
        }
    };


    return (
        <div>
            <Form onSubmit={handleSubmit} className='edit-phone-adim'>
                <FormGroup className="form-group-input" id="telefone">
                    <Label>Telefone</Label>
                    <div className='input-button-admin'>
                        <MaskedInputCel
                            // onChange={(e) => console.log(e)}
                            type="telefone"
                            id="telefone"
                            placeholder="Telefone"
                            reference={telefoneRef}
                            required={true}
                            setError={setError}
                            error={error}
                            value={usuario.telefone}
                        />

                        <button className='send-new'>
                            <span class="btn-check">&#10003;</span>
                        </button>
                    </div>

                </FormGroup>
            </Form>
        </div>
    )
}

export default UsuarioTelefone