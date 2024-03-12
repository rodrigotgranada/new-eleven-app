import moment from "moment";
import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

const ButtonDate = ({ handleDate, filtro, setFiltro }) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {moment(filtro?.dia).format("DD/MM/YYYY")}
    </button>
  ));
  return (
    <DatePicker
      // selected={startDate}
      onChange={(date) => handleDate(moment(date).format("YYYY-MM-DD"))}
      // filterDate={isWeekday}
      locale="ptBR"
      // maxDate={new Date()}
      customInput={<ExampleCustomInput />}
      dateFormat="dd/MM/yyyy"
      // inline
      placeholderText="Quando Inicia"
    />
  );
};

export default ButtonDate;
