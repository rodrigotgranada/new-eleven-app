import ptBR from "date-fns/locale/pt-BR";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useAuth } from "../../../../contexts/AuthContext";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import "./../../../../styles/public/calendar.scss";
registerLocale("ptBR", ptBR);

const Calendario = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    let usuario = { ...marcacao };
    usuario.codLocacao = getRandomInt(0, 99999);
    usuario.owner = currentUser?.usuario?.uid;
    usuario.user = currentUser?.usuario;
    usuario.createAt = moment(new Date()).format("DD/MM/YYYY");
    usuario.step = 0;
    setMarcacao(usuario);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const onChange = (date) => {
    console.log(date);
    let formatedDate = moment(date).format("DD/MM/YYYY");
    console.log(formatedDate);
    setStartDate(date);
    let dataFinal = { ...marcacao };
    // const dataT = { date };
    dataFinal.dataDia = formatedDate;
    dataFinal.step = dataFinal.step + 1;
    setMarcacao(dataFinal);
  };

  let max_date = new Date(); // today!
  let x = 40;
  max_date.setDate(max_date.getDate() + x);
  let min_date = new Date();

  return (
    <div className="customDatePickerWidth">
      <DatePicker
        calendarClassName="datePicker"
        wrapperClassName="datePicker"
        selected={startDate}
        onChange={onChange}
        locale="ptBR"
        minDate={min_date}
        maxDate={max_date}
        inline
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
            <div className="datePickerNav">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <BiSolidLeftArrow />
              </button>
              <p
                style={{ margin: "auto 0" }}
              >{` ${month} - ${date.getFullYear()}`}</p>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <BiSolidRightArrow />
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calendario;
