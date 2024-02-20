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
    getHorarios("horarios", "value", "asc");
  }, []);

  return (
    <>
      {/* <Row> */}
      {horarios &&
        horarios.map((horario, index) => {
          return (
            // <div >
            <ButtonsHoras
              key={index}
              horario={horario}
              index={index}
              // dataClick={dataClick}
              // quadraClick={quadraClick}
              // type={type}
            />
            // </div>
          );
        })}
      {/* </Row> */}
    </>
  );
};

export default Horas;
