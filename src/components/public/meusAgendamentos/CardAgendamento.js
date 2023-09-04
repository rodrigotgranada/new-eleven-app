import React, { useEffect } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";

const CardAgendamento = ({ marcacao, chave, ...props }) => {
  console.log(marcacao, chave);
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();

  useEffect(() => {
    getHorario("horarios", marcacao?.dataHorario);
    getEsporte("modalidades", marcacao?.esporte);
    getQuadra("quadras", marcacao?.quadra);
  }, []);

  return (
    <Card key={chave} className="card-agendamento">
      {loadingEsporte && loadingHorario && loadingQuadra && (
        <p>Carregando...</p>
      )}
      {marcacao &&
        Object.keys(hora).length > 0 &&
        Object.keys(esporte).length > 0 &&
        Object.keys(quadra).length > 0 && (
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
        )}
    </Card>
  );
};

export default CardAgendamento;
