import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import useGetData from "../../hooks/useGetData";
import SubNav from "./SubNav";
import { Container } from "./styles";

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
  const { title } = useContext(ThemeContext);

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

  let buttons;

  if (currentUser) {
    // console.log("rule", currentUser?.usuario?.rule);
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
        <Container>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <img src="https://firebasestorage.googleapis.com/v0/b/new-eleven-app.appspot.com/o/assets%2Fimgs%2FelevenSemFundo.png?alt=media&token=f5cd4011-7d26-4bca-8852-268360aca99c" />
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <button onClick={() => props.toggleTheme()}>
                  {title === "light" ? "Modo Escuro" : "Modo Claro"}
                </button>
              </li>
              {buttons}
            </ul>
          </nav>
        </Container>
        <SubNav admin={true} />
      </>
    );
  } else {
    verifyNav = (
      <>
        <Container>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <img src="https://firebasestorage.googleapis.com/v0/b/new-eleven-app.appspot.com/o/assets%2Fimgs%2FelevenSemFundo.png?alt=media&token=f5cd4011-7d26-4bca-8852-268360aca99c" />
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <button onClick={() => props.toggleTheme()}>
                  {title === "light" ? "Modo Escuro" : "Modo Claro"}
                </button>
              </li>
              {buttons}
            </ul>
          </nav>
        </Container>

        <SubNav admin={false} />
      </>
    );
  }

  return <div>{verifyNav}</div>;
};
