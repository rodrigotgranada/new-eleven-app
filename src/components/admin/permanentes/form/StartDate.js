import React, { forwardRef, useContext, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import { ptBR } from "date-fns/locale";
import moment from "moment";
registerLocale("ptBR", ptBR);

const StartDate = () => {
  const [startDate, setStartDate] = useState(null);
  const { permanente, setPermanente } = useContext(PermanenteContext);

  const weekValue = [
    { number: 0, value: "Domingo" },
    { number: 1, value: "Segunda" },
    { number: 2, value: "Terca" },
    { number: 3, value: "Quarta" },
    { number: 4, value: "Quinta" },
    { number: 5, value: "Sexta" },
    { number: 6, value: "Sabado" },
  ];

  // console.log("weekvalue", weekValue);
  let newArray = weekValue.filter(function (el) {
    return el.value === permanente.diaSemana;
  });
  // console.log("newArray", newArray[0]);

  const isWeekday = (date) => {
    const day = date.getDay();
    return day === newArray[0].number;
  };

  const handleStartDia = (dia) => {
    const editedDay = moment(dia).format("YYYY-MM-DD");
    const lastDay = moment(editedDay).add(52, "w").format("YYYY-MM-DD");
    let start = { ...permanente };
    start.dataInicio = editedDay;
    start.dataFim = lastDay;
    setPermanente(start);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {permanente.dataInicio
        ? moment(permanente.dataInicio).format("DD/MM/YYYY")
        : "Data Inicio"}
    </button>
  ));

  const dateInicio = new Date();
  const newDateInicio = dateInicio.setDate(dateInicio.getDate() + 8);

  return (
    <DatePicker
      // selected={startDate}
      onChange={(date) => handleStartDia(date)}
      filterDate={isWeekday}
      locale="ptBR"
      minDate={newDateInicio}
      customInput={<ExampleCustomInput />}
      dateFormat="dd/MM/yyyy"
      // inline
      placeholderText="Quando Inicia"
    />
  );
};

export default StartDate;
