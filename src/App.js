import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyle from "./styles/global";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import usePersistedState from "./utils/usePersistedState";

function App() {
  const [theme, setTheme] = usePersistedState("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <ToastContainer />
          <GlobalStyle />
          <Layout toggleTheme={toggleTheme} />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
