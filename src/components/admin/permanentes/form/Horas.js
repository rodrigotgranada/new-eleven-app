import React, { useContext, useEffect } from "react";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import useGetData from "../../../../hooks/useGetData";
import ButtonsHoras from "./ButtonsHoras";
import { Row } from "reactstrap";

const Horas = ({ dia }) => {
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const {
    getDataOrderBy: getHorarios,
    data: horarios,
    loading: carregaHorarios,
  } = useGetData();
  useEffect(() => {
    if (permanente) {
      // console.log("recarreguei");
      getHorarios("horarios", "value", "asc");
    }
  }, [permanente]);

  return (
    <>
      <Row>
        {horarios &&
          horarios.map((horario, index) => {
            return (
              <div key={index}>
                <ButtonsHoras
                  horario={horario}
                  // dataClick={dataClick}
                  // quadraClick={quadraClick}
                  // type={type}
                />
              </div>
            );
          })}
      </Row>
    </>
  );
};

export default Horas;
