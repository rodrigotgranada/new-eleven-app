import React from "react";
import useGetData from "../../../hooks/useGetData";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import ButtonHorarioAgenda from "./ButtonHorarioAgenda";
import { useContext } from "react";
import AgendaContext from "../../../contexts/AgendaContext";

const ListHorarios = ({ dataClick, quadraClick }) => {
  // console.log("hora", dataClick, quadraClick);
  const { currentUser } = useAuth();
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);
  const {
    getDataOrderBy: getHorarios,
    data: horarios,
    loading: carregaHorarios,
  } = useGetData();

  useEffect(() => {
    if (agendaDate) {
      // console.log("recarreguei");
      getHorarios("horarios", "value", "asc");
    }
  }, [agendaDate]);

  const handleClick = async (horaID) => {
    console.log("horaID", horaID);
    console.log("dataClick", moment(dataClick).format("DD/MM/YYYY"));
    console.log("quadraClick", quadraClick);
  };

  return (
    <>
      <div className="bloco-horarios">
        {horarios &&
          horarios.map((horario, index) => {
            console.log(horario);
            return (
              <div key={index}>
                <ButtonHorarioAgenda
                  horario={horario}
                  dataClick={dataClick}
                  quadraClick={quadraClick}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListHorarios;
