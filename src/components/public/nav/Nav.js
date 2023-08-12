import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';


// const logout = () => {
//   console.log(`Sair`)
//   signOut(auth)
//     .then(() => {
//       toast.success("Logged out");
//       Navigate("/home");
//     })
//     .catch((err) => {
//       toast.error(err.message);
//     });
// };



export const Nav = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
  
    try {
      await logout();
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setError("Failed to log out");
    }
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div>
      <p>Nav | {currentUser ? <span onClick={handleLogout}> Sair </span> : <span onClick={handleLogin}> Login </span> } </p>
    </div>
  )
}