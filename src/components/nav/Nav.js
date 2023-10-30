import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { ThemeContext } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import useGetData from "../../hooks/useGetData";
import ReactSwitch from "react-switch";
import "../../styles/public/nav.scss";
import SubNav from "./SubNav";
import { Switch } from "@mui/material";
import { BsFillMoonFill, BsSun } from "react-icons/bs";

export const Nav = (props) => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  useEffect(() => {
    getImagemPadrao("fotoPadrao");
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  // const { title } = useContext(ThemeContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      toast.success("Logged out", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setError("Failed to log out");
    }
  };

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  let buttons;

  if (currentUser?.usuario) {
    console.log("rule", currentUser);
    buttons = (
      <>
        {currentUser?.usuario?.rule &&
          !location.pathname.startsWith("/admin") && (
            <li>
              <Link to="/admin" title="Admin">
                Admin
              </Link>
            </li>
          )}

        <li>
          <img
            src={
              currentUser?.usuario?.photoURL
                ? currentUser?.usuario?.photoURL
                : fotoPadrao[0]?.userPadrao
            }
            alt={
              currentUser?.usuario?.displayName
                ? currentUser?.usuario?.displayName
                : "Usuario"
            }
            style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          />
        </li>
        <li>
          <Link to="/my-profile" title="Entrar">
            {currentUser?.usuario?.displayName
              ? currentUser?.usuario?.displayName
              : `Profile`}
          </Link>
        </li>

        <li>
          <span onClick={handleLogout}>Sair</span>
        </li>
        <li>
          <img />
        </li>
      </>
    );
  } else {
    buttons = (
      <>
        <li>
          <Link to="/signup" title="Cadastrar">
            Cadastrar
          </Link>
        </li>
        <li>
          <Link to="/login" title="Entrar">
            Login
          </Link>
        </li>
      </>
    );
  }

  let verifyNav;
  if (location.pathname.startsWith("/admin")) {
    verifyNav = (
      <>
        {/* <Container> */}
        {/* <nav className="main-nav"> */}
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/new-eleven-app.appspot.com/o/assets%2Fimgs%2FelevenSemFundo.png?alt=media&token=f5cd4011-7d26-4bca-8852-268360aca99c"
                  alt="Home"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className="theme-toggle">
              <ReactSwitch onChange={changeTheme} checked={theme === "dark"} />
              {/* <span>Modo Claro</span> */}
            </li>
            {buttons}
          </ul>
        </nav>
        {/* </nav> */}
        {/* </Container> */}
        {currentUser && (
          <SubNav admin={true} rule={currentUser?.usuario?.owner} />
        )}
      </>
    );
  } else {
    verifyNav = (
      <>
        {/* <Container> */}
        <nav className="main-nav">
          {/* <nav className="main-nav"> */}
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/new-eleven-app.appspot.com/o/assets%2Fimgs%2FelevenSemFundo.png?alt=media&token=f5cd4011-7d26-4bca-8852-268360aca99c"
                  alt="Home"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className="theme-toggle">
              <BsSun />
              <Switch
                color="primary"
                checked={theme === "dark"}
                onChange={changeTheme}
              />
              <BsFillMoonFill />
              {/* <ReactSwitch
                onChange={changeTheme}
                checked={theme === "dark"}
                height={17}
              /> */}
              {/* <span>Modo Claro</span> */}
            </li>
            {buttons}
          </ul>
          {/* </nav> */}
        </nav>
        {/* </Container> */}

        {currentUser && <SubNav admin={false} />}
      </>
    );
  }

  return <div>{verifyNav}</div>;
};
