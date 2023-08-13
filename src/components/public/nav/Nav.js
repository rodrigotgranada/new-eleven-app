import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components'
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { Container } from "./styles";


export const Nav = (props) => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { title } = useContext(ThemeContext)

  const handleLogout = async () => {
    setError("");
  
    try {
      await logout();
      toast.success("Logged out", {
        position: toast.POSITION.TOP_CENTER
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setError("Failed to log out");
    }
  }


  let buttons;

  if (currentUser) {
    buttons = (
      <>
      {currentUser.usuario.rule && <li>
          <Link to="/admin/" title="Admin">
            Admin
          </Link>
        </li>}
        
        <li>
          <Link to="/my-profile" title="Entrar">
            Profile
          </Link>
        </li>
        
        <li>
          <span onClick={handleLogout}>Sair</span>
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

  return (
    <div>
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
              <button onClick={() => props.toggleTheme()}>{title === 'light' ? 'Modo Escuro' : 'Modo Claro'}</button>
            </li>
            {buttons}
          </ul>
        </nav>
      </Container>
      {/* <p>Nav | {currentUser ? <span onClick={handleLogout}> Sair </span> : <span onClick={handleLogin}> Login </span> } </p> */}
    </div>
  )
}