import React, { useEffect, useState } from "react";
export const initialThemeState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeContext = React.createContext(initialThemeState);

export const ThemeProviderx = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem("globalTheme");

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("globalTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`} style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
