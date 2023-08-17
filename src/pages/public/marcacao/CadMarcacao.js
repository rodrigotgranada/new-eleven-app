import { useState } from "react";
import Calendar from "react-calendar";
// import bootstrap5Plugin from "@fullcalendar/bootstrap5";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import FullCalendar from "@fullcalendar/react";
import "./calendar.scss";

const CadMarcacao = () => {
  const [date, setDate] = useState(new Date());
  //   useEffect(() => {
  //     console.log("data", value);
  //   }, [value]);

  const handleDateClick = (arg) => {
    console.log(arg);
  };

  //   function renderEventContent(eventInfo) {
  //     return (
  //       <>
  //         <b>{eventInfo.timeText}</b>
  //         <i>{eventInfo.event.title}</i>
  //       </>
  //     );
  //   }

  let max_date = new Date(); // today!
  let x = 7; // go back 5 days!
  max_date.setDate(max_date.getDate() + x);

  return (
    <div>
      <Calendar
        onChange={handleDateClick}
        value={date}
        className="react-calendar"
        defaultView="month"
        view="month"
        activeStartDate={new Date()}
        maxDate={max_date} // will not allow date later than today
        minDate={new Date()}
        locale="pt"
        calendarStartDay={7}
        // onClickDay={(value) => alert("day" + value + "clicked")}
      />
      {/* <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        themeSystem={"bootstrap5"}
        initialView="dayGridMonth"
        validRange={{
          start: new Date(),
          end: max_date,
        }}
        weekends={true}
        dateClick={(e) => handleDateClick(e)}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        height={"60vh"}
        locale={"pt-br"}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Hoje",
          list: "Lista",
        }}
        buttonIcons={{
          prev: "chevron-double-left",
          next: "chevron-double-right",
        }}
        timeFormat={"HH:mm"}
        slotLabelForma={"HH:mm"}
        allDayText={"24 horas"}
        columnFormat={"dddd"}
        eventContent={renderEventContent}
      /> */}
    </div>
  );
};

export default CadMarcacao;
