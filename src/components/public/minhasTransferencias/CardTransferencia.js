import React, { useEffect } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";
import Loading from "../Loading/Loading";
import MinhaMarcacao from "../modal/MinhaMarcacao";
import { useState } from "react";
import useTransferAgendamento from "../../../hooks/useTransferAgendamento";
import moment from "moment";
import MinhaTransferencia from "../modal/MinhaTransferencia";

const CardTransferencia = ({ transferencia, chave, ...props }) => {
  // console.log("trans", transferencia, chave);
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();
  const {
    getDataId: getAgendamento,
    data: agendamento,
    loadingAgendamento,
  } = useGetData();
  const { checkTransfer } = useTransferAgendamento();
  const [modalOpen, setModalOpen] = useState(false);
  const [marc, setMarc] = useState(null);
  const [haveTransfer, setHaveTransfer] = useState(false);

  const data = transferencia;
  useEffect(() => {
    if (transferencia) {
      handleGetQuadraInfos();
    }
  }, [transferencia]);

  const handleGetQuadraInfos = async () => {
    const marcacaoX = await getAgendamento("agenda", transferencia?.locacaoID);
    if (marcacaoX) {
      await getHorario("horarios", marcacaoX?.dataHorario);
      await getEsporte("modalidades", marcacaoX?.esporte);
      await getQuadra("quadras", marcacaoX?.quadra);
    }
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
        <MinhaTransferencia
          title={`Agendamento ${transferencia?.codLocacao}`}
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          transferencia={modalOpen ? data : null}
          agendamento={agendamento}
          horario={hora}
          esporte={esporte}
          quadra={quadra}
        />
      )}
      {transferencia &&
        agendamento &&
        Object.keys(hora).length > 0 &&
        Object.keys(esporte).length > 0 &&
        Object.keys(quadra).length > 0 && (
          <Card
            key={chave}
            className={`card-agendamento ${
              transferencia?.transfer_id ? "card-with-transfer" : null
            }`}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div>
              <p>Código: {agendamento?.codLocacao}</p>
              <p>Data: {formataData(agendamento?.dataDia)}</p>
              <p>Hora: {`${hora?.value}:00`}</p>
              <p>Esporte: {esporte?.display}</p>
              <p>Quadra: {quadra?.name}</p>
            </div>
          </Card>
        )}
    </>
  );
};

export default CardTransferencia;
