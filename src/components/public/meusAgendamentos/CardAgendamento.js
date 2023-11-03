import React, { useEffect } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";
import Loading from "../Loading/Loading";
import MinhaMarcacao from "../modal/MinhaMarcacao";
import { useState } from "react";
import useTransferAgendamento from "../../../hooks/useTransferAgendamento";
import moment from "moment";

const CardAgendamento = ({ marcacao, chave, ...props }) => {
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();
  const { checkTransfer } = useTransferAgendamento();
  const [modalOpen, setModalOpen] = useState(false);
  const [haveTransfer, setHaveTransfer] = useState(false);

  const data = marcacao;
  useEffect(() => {
    if (marcacao) {
      getHorario("horarios", marcacao?.dataHorario);
      getEsporte("modalidades", marcacao?.esporte);
      getQuadra("quadras", marcacao?.quadra);
      verifyTransfer();
    }
  }, [marcacao]);

  const verifyTransfer = async () => {
    if (marcacao?.transfer_id) {
      const checked = await checkTransfer(marcacao?.transfer_id);
      if (checked && checked.error) {
        setHaveTransfer(true);
      } else {
        setHaveTransfer(false);
      }
    } else {
      setHaveTransfer(false);
    }

    // console.log("checked", checked);
  };

  const formataData = (data) => {
    return moment(data).format("DD/MM/YYYY");
  };

  return (
    <>
      {loadingEsporte && loadingHorario && loadingQuadra && (
        <Loading type={`spin`} width={"30px"} />
      )}

      {modalOpen && (
        <MinhaMarcacao
          title={`Agendamento ${marcacao?.codLocacao}`}
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          marcacao={modalOpen ? data : null}
          horario={hora}
          esporte={esporte}
          quadra={quadra}
        />
      )}
      {marcacao &&
        Object.keys(hora).length > 0 &&
        Object.keys(esporte).length > 0 &&
        Object.keys(quadra).length > 0 && (
          <Card
            key={chave}
            className={`card-agendamento ${
              marcacao?.transfer_id ? "card-with-transfer" : null
            }`}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div>
              <p>Código: {marcacao?.codLocacao}</p>
              <p>Data: {formataData(marcacao?.dataDia)}</p>
              <p>Hora: {`${hora?.value}:00`}</p>
              <p>Esporte: {esporte?.display}</p>
              <p>Quadra: {quadra?.name}</p>
              {/* <p>Jogadores:</p>
              <ol>
                {marcacao?.jogadores &&
                  marcacao?.jogadores.map((jogador, index) => {
                    return <li key={index}>{jogador?.name}</li>;
                  })}
              </ol> */}
            </div>
          </Card>
        )}
    </>
  );
};

export default CardAgendamento;
