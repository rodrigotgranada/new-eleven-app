import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProviderx } from "./contexts/ThemeContext";
// import GlobalStyle from "./styles/global";

function App() {
  // const [theme, setTheme] = usePersistedState("theme", light);

  // const toggleTheme = () => {
  //   setTheme(theme.title === "light" ? dark : light);
  // };
  return (
    // <ThemeProvider theme={theme}>
    <ThemeProviderx>
      <Router>
        <AuthProvider>
          <ToastContainer />
          {/* <GlobalStyle /> */}
          <Layout />
          {/* <Layout toggleTheme={toggleTheme} /> */}
        </AuthProvider>
      </Router>
    </ThemeProviderx>
    // </ThemeProvider>
  );
}

export default App;
