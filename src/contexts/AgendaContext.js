import React, { createContext, useEffect, useState } from "react";

const AgendaContext = createContext();

export function AgendaProvider({ children }) {
  const [agendaDate, setAgendaDate] = useState(new Date());
  useEffect(() => {
    console.log("AgendaContext", agendaDate);
  }, [agendaDate]);
  return (
    <AgendaContext.Provider value={{ agendaDate, setAgendaDate }}>
      {children}
    </AgendaContext.Provider>
  );
}

export default AgendaContext;
