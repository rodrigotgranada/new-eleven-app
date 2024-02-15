import React, { createContext, useEffect, useState } from "react";
import { permanenteTemplate } from "../utils/permanenteTemplateJson";

const PermanenteContext = createContext();

export function PermanenteProvider({ children }) {
  // const [agendaDate, setAgendaDate] = useState(new Date());
  // const [permanenteDate, setPermanenteDate] = useState(new Date());
  const [permanente, setPermanente] = useState(permanenteTemplate);
  useEffect(() => {
    console.log("permanente", permanente);
  }, [permanente]);
  return (
    <PermanenteContext.Provider value={{ permanente, setPermanente }}>
      {children}
    </PermanenteContext.Provider>
  );
}

export default PermanenteContext;
