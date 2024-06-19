import React from "react";
import useGetData from "../../../hooks/useGetData";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import ButtonHorarioAgenda from "./ButtonHorarioAgenda";
import { useContext } from "react";
import AgendaContext from "../../../contexts/AgendaContext";
import ButtonHorarioAgenda2 from "./ButtonHorarioAgenda2";

const ListHorarios = ({ dataClick, quadraClick, type }) => {
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
            return (
              // <div>
                <ButtonHorarioAgenda
                key={index}
                  horario={horario}
                  dataClick={dataClick}
                  quadraClick={quadraClick}
                  type={type}
                />
               
              // </div>
            );
          })}
      </div>
    </>
  );
};

export default ListHorarios;
