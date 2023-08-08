import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        {/* <Nav />
          <Routes /> */}
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
