import React, { createContext, useEffect, useState } from "react";

const ChurrasqueiraContext = createContext();

export function ChurrasqueiraProvider({ children }) {
  const [churrasqueiraDate, setChurrasqueiraDate] = useState(new Date());
  useEffect(() => {
    console.log("ChurrasqueiraContext", churrasqueiraDate);
  }, [churrasqueiraDate]);
  return (
    <ChurrasqueiraContext.Provider
      value={{ churrasqueiraDate, setChurrasqueiraDate }}
    >
      {children}
    </ChurrasqueiraContext.Provider>
  );
}

export default ChurrasqueiraContext;
