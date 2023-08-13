import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from 'styled-components'
import usePersistedState from "./utils/usePersistedState";
import light from './styles/themes/light'
import dark from './styles/themes/dark'
import GlobalStyle from './styles/global'



function App() {
  const [theme, setTheme] = usePersistedState('theme', light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
        <ToastContainer />
        {/* <Nav />
          <Routes /> */}
          <GlobalStyle />
        <Layout toggleTheme={toggleTheme}/>
      </AuthProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;
