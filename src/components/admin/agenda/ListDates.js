import React, { forwardRef, useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "../../../styles/admin/agenda.scss";
import { GiAztecCalendarSun } from "react-icons/gi";
import { useAuth } from "../../../contexts/AuthContext";
import useGetData from "../../../hooks/useGetData";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FormSelect } from "react-bootstrap";
import TiposQuadras from "./TiposQuadras";
import AgendaContext from "../../../contexts/AgendaContext";

const ListDates = () => {
  const { currentUser } = useAuth();
  const {
    getDataOrderBy: getTiposQuadra,
    data: tiposQuadra,
    loading: carregaModalidades,
  } = useGetData();
  const {
    getDataOrderBy: getHorarios,
    data: horarios,
    loading: carregaHorarios,
  } = useGetData();
  const [startDate, setStartDate] = useState(new Date());
  const [modalidadeFilter, setmodalidadeFilter] = useState("all");
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);

  useEffect(() => {
    console.log("startDate", startDate);
  }, [startDate]);

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser", currentUser);
      getTiposQuadra("tiposQuadra", "display", "asc");
      getHorarios("horarios", "value", "asc");
    }
  }, [currentUser]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const handleSearch = (filter) => {
    console.log("filter", filter);
    setmodalidadeFilter(filter);
  };

  return (
    <section className="agenda-main">
      <section className="agenda-filtro">
        <DatePicker
          selected={agendaDate}
          onChange={(date) => setAgendaDate(date)}
          customInput={<ExampleCustomInput />}
          dateFormat="dd/MM/yyyy"
          // inline
          showDisabledMonthNavigation
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => {
            let month = [
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ][date.getMonth()];
            return (
              <div className="datePickerNav2">
                <button
                  className="decreaseMonth"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {/* <span>{`<`}</span> */}
                  <BiSolidLeftArrow />
                </button>
                <p
                  style={{ margin: "auto 0" }}
                >{` ${month} - ${date.getFullYear()}`}</p>
                <button
                  className="increaseMonth"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {/* <span>{`>`}</span> */}
                  <BiSolidRightArrow />
                </button>
              </div>
            );
          }}
        />

        <FormSelect
          className="select-filter"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        >
          <option value="all">Todos</option>
          {tiposQuadra &&
            tiposQuadra.map((tipoQuadra, index) => {
              return (
                <option key={index} value={tipoQuadra.id}>
                  {tipoQuadra.display}
                </option>
              );
            })}
        </FormSelect>
      </section>
      {tiposQuadra &&
        tiposQuadra.map((tipoQuadra, index) => {
          if (
            tipoQuadra.id === modalidadeFilter ||
            modalidadeFilter === "all"
          ) {
            return (
              <div key={index}>
                <h1>{tipoQuadra.display}</h1>
                <section id={tipoQuadra.id} className="section-types">
                  <TiposQuadras dia={agendaDate} type={tipoQuadra} />
                </section>
              </div>
            );
          }
        })}
    </section>
  );
};

export default ListDates;
