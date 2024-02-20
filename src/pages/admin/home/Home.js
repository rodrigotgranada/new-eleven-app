import moment from "moment";
import React, { useEffect } from "react";

const AdminHome = () => {
  const diaInicio = "2024-02-15";
  const diaFim = "2025-02-15";

  const testeFor = () => {
    const diaInicioB = "2024-02-15";
    const diaFimB = "2025-02-15";
    let dates = [];
    let dates_string = [];
    for (
      let i = moment(diaInicioB);
      i.diff(diaFimB, "days") <= 0;
      i.add(7, "days")
    ) {
      dates.push(i.clone());
      dates_string.push(i.format("YYYY-MM-DD"));
    }
    // console.log("dates", dates);
    // console.log("dates_string", dates_string);
    dates_string.map((date) => {
      console.log("date", date);
    });
  };

  useEffect(() => {
    testeFor();
  }, []);

  return (
    <>
      {diaInicio}
      <br />
      {diaFim}
    </>
  );
};

export default AdminHome;
