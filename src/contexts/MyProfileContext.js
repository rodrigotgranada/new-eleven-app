import React, { createContext, useEffect, useState } from "react";

const MyProfileContext = createContext();

export function MyProfileProvider({ children }) {
  const [page, setPage] = useState("profile");
  useEffect(() => {
    console.log("MyProfileContext", page);
  }, [page]);
  return (
    <MyProfileContext.Provider value={{ page, setPage }}>
      {children}
    </MyProfileContext.Provider>
  );
}

export default MyProfileContext;
