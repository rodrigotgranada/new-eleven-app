import React, { useEffect } from 'react'
import { Card } from "reactstrap";
import useGetData from '../../../hooks/useGetData';
import { useAuth } from '../../../contexts/AuthContext';
import moment from 'moment';
import Loading from '../Loading/Loading';

const HomeAgendaCard = ({ item }) => {
  const { currentUser } = useAuth();
  const {
    getDataWhereOrderByLimit2: getMinhasMarcacoes3,
    data: minhasMarcacoes2,
    loading: loadingMinhasMarcacoes2,
  } = useGetData();
  const { getDataId: getHorario, data: hora, loadingHorario } = useGetData();
  const { getDataId: getEsporte, data: esporte, loadingEsporte } = useGetData();
  const { getDataId: getQuadra, data: quadra, loadingQuadra } = useGetData();

  useEffect(() => {
    if(item.agenda){
      const dataAtual = moment(new Date()).format("YYYY-MM-DD");
      getMinhasMarcacoes3(
        "agenda",
        "user",
        "==",
        currentUser?.uid,
        "dataDia",
        ">=",
        dataAtual,
        "dataDia",
        "asc",
        1
      );
    }
    return () => {}
  }, [item])

  useEffect(() => {
    if(Object.keys(minhasMarcacoes2).length > 0) {
      getHorario("horarios", minhasMarcacoes2[0]?.dataHorario)
      getEsporte("modalidades", minhasMarcacoes2[0]?.esporte);
      getQuadra("quadras", minhasMarcacoes2[0]?.quadra);
    }

    return () => { }
  }, [minhasMarcacoes2])


  return (
    <>
      <span className='nameBtnHome'>{item.display}</span>
      <Card className='cardAgendaHome'>
      {loadingMinhasMarcacoes2 && (
        <Loading type={`spin`} width={"30px"} />
      )}

      {Object.keys(minhasMarcacoes2).length === 0 && (
        <span className='resultAgenda'>Nenhum Agendamento</span>
      )}
      {Object.keys(minhasMarcacoes2).length > 0 && (
        <div className='containerAgendamento'>
          <span className='titleAgenda'>Data: <span className='resultAgenda'>{moment(minhasMarcacoes2[0]?.dataDia).format("DD/MM/YYYY")}</span></span>
          <span className='titleAgenda'>Horário: <span className='resultAgenda'>{loadingHorario ? <Loading type={`spin`} width={"18px"} /> : hora ? `${hora.value}:00` : ""}</span></span>
          <span className='titleAgenda'>Quadra: <span className='resultAgenda'>{loadingHorario ? <Loading type={`spin`} width={"18px"} /> : quadra ? `${quadra.name} (${quadra.numero})` : ""}</span></span>
          <span className='titleAgenda'>Esporte: <span className='resultAgenda'>{loadingHorario ? <Loading type={`spin`} width={"18px"} /> : esporte ? esporte.display : ""}</span></span>
        </div>
      )}
      </Card>
    </>
  )
}

export default HomeAgendaCard
