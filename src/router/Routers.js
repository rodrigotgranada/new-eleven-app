import React from "react";
import { Switch, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/home/Home";
import Page_404 from "../pages/public/error/Page_404";
import Signup from "../pages/public/auth/Signup";
import Login from "../pages/public/auth/Login";
import ForgotPassword from "../pages/public/auth/ForgotPassword";


const Routers = () => {
    return (
        <Routes>
            <Route path="*" element={<Page_404 />} />
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            {/* Protect */}


            {/* Auth */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}

export default Routers