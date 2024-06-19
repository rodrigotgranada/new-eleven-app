import React from "react";
import useGetData from "../../../hooks/useGetData";
import ListHorarios from "./ListHorarios";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useContext } from "react";
import AgendaContext from "../../../contexts/AgendaContext";

const TiposQuadras = ({ dia, type }) => {
  const { currentUser } = useAuth();
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);
  const {
    getDataWhere: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  const {
    getDataWhereOrderByLimit: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();

  useEffect(() => {
    if (agendaDate) {
      handleModalides();
    }
  }, [agendaDate]);

  const handleModalides = async () => {
    getModalidades("modalidades", "type", "==", type.id);
    getQuadras("quadras", "type", "==", type.id, "numero", "asc", 1000);
  };

  // useEffect(() => {
  //   if (modalidades.length > 0) {
  //     console.log("modalidades", modalidades);
  //   }
  // }, [modalidades]);
  return (
    <>
      {quadras &&
        quadras.length > 0 &&
        quadras.map((quadra, index) => {
          return (
            <div className="bloco-quadras" key={index}>
              <span>
                {quadra.numero} 
                ({quadra.name}){" "}
              </span>{" "}
              <ListHorarios dataClick={dia} quadraClick={quadra} type={type} />
            </div>
          );
        })}
    </>
  );
};

export default TiposQuadras;
