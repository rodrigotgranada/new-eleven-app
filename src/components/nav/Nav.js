import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "../../styles/public/nav.scss";
import SubNav from "./SubNav";
import { BsMoonFill, BsMoon } from "react-icons/bs";

export const Nav = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      toast.success("Logged out", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_CENTER,
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
          <Link to="/meu-perfil" title="Entrar">
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
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/eleven-bb625.appspot.com/o/logos%2FelevenSemFundo.png?alt=media&token=68701f64-0ab9-4808-bb88-00174a8c8439"
                  alt="Home"
                  className="logo-eleven-full"
                />
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/eleven-bb625.appspot.com/o/logos%2FLogoElevenSemFundo.png?alt=media&token=4fb9b640-217a-4bf5-9de9-481cd053c0b1"
                  }
                  alt="Home"
                  className="logo-eleven-mini"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className="theme-toggle">
              {theme === "dark" ? (
                <BsMoonFill onClick={changeTheme} />
              ) : (
                <BsMoon onClick={changeTheme} />
              )}
            </li>
            {buttons}
          </ul>
        </nav>
        {currentUser &&
          currentUser?.usuario &&
          currentUser?.usuario?.checked && (
            <SubNav admin={true} rule={currentUser?.usuario?.owner} />
          )}
      </>
    );
  } else {
    verifyNav = (
      <>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/eleven-bb625.appspot.com/o/logos%2FelevenSemFundo.png?alt=media&token=68701f64-0ab9-4808-bb88-00174a8c8439"
                  alt="Home"
                  className="logo-eleven-full"
                />
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/eleven-bb625.appspot.com/o/logos%2FLogoElevenSemFundo.png?alt=media&token=4fb9b640-217a-4bf5-9de9-481cd053c0b1"
                  }
                  alt="Home"
                  className="logo-eleven-mini"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li className="theme-toggle">
              {theme === "dark" ? (
                <BsMoonFill onClick={changeTheme} />
              ) : (
                <BsMoon onClick={changeTheme} />
              )}
            </li>
            {buttons}
          </ul>
        </nav>
        {/* {currentUser &&
          currentUser?.usuario &&
          currentUser?.usuario?.checked && <SubNav admin={false} />} */}
      </>
    );
  }

  return <div>{verifyNav}</div>;
};
