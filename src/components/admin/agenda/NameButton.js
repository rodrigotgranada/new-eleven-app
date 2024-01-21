import React, { useContext } from "react";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import { useState } from "react";
import AgendaContext from "../../../contexts/AgendaContext";

const NameButton = ({ text, horario }) => {
  const { getDataId } = useGetData();
  const [name, setName] = useState(null);
  const { agendaDate, setAgendaDate } = useContext(AgendaContext);

  useEffect(() => {
    getName();
  }, [agendaDate]);

  const getName = async () => {
    if (text) {
      const user = await getDataId("users", text);
      // console.log(user.displayName);
      setName(user.displayName);
    } else {
      setName(horario);
    }
  };

  return (
    <>
      {/* {console.log("NAME", name)} */}
      <span>{name}</span>
    </>
  );
};

export default NameButton;
