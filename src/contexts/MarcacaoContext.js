import React, { createContext, useEffect, useState } from "react";
import { marcacaoTemplate } from "../utils/marcacaoTemplateJson";

const MarcacaoContext = createContext();

export function MarcacaoProvider({ children }) {
  const [marcacao, setMarcacao] = useState(marcacaoTemplate);
  // useEffect(() => {
  //   console.log("marcacaoContext", marcacao);
  // }, [marcacao]);
  return (
    <MarcacaoContext.Provider value={{ marcacao, setMarcacao }}>
      {children}
    </MarcacaoContext.Provider>
  );
}

export default MarcacaoContext;
