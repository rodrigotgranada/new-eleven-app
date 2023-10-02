import React, { useEffect } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";
import Loading from "../Loading/Loading";

const CardAgendamento = ({ marcacao, chave, ...props }) => {
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();

  useEffect(() => {
    getHorario("horarios", marcacao?.dataHorario);
    getEsporte("modalidades", marcacao?.esporte);
    getQuadra("quadras", marcacao?.quadra);
  }, []);

  return (
    <>
      {loadingEsporte && loadingHorario && loadingQuadra && (
        <Loading type={`spin`} width={"30px"} />
      )}
      {marcacao &&
        Object.keys(hora).length > 0 &&
        Object.keys(esporte).length > 0 &&
        Object.keys(quadra).length > 0 && (
          <Card key={chave} className="card-agendamento">
            <div>
              <p>Código: {marcacao?.codLocacao}</p>
              <p>Data: {marcacao?.dataDia}</p>
              <p>Hora: {`${hora?.value}:00`}</p>
              <p>Esporte: {esporte?.display}</p>
              <p>Quadra: {quadra?.name}</p>
              <p>Jogadores:</p>
              <ol>
                {marcacao?.jogadores &&
                  marcacao?.jogadores.map((jogador, index) => {
                    return <li key={index}>{jogador?.name}</li>;
                  })}
              </ol>
            </div>
          </Card>
        )}
    </>
  );
};

export default CardAgendamento;
