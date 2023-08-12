import React from "react";
import { Switch, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/home/Home";
import Page_404 from "../pages/public/error/Page_404";
import Signup from "../pages/public/auth/Signup";
import Login from "../pages/public/auth/Login";
import ForgotPassword from "../pages/public/auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MyProfile from "../pages/private/profile/MyProfile";
import AdminHome from "../pages/admin/home/Home";
import UpdateProfile from "../pages/private/profile/UpdateProfile";
import { useAuth } from "../contexts/AuthContext";
import RegisterRoute from "./RegisterRoute";


const Routers = () => {
    const { currentUser } = useAuth();
    return (
        <Routes>
            <Route path="*" element={<Page_404 />} />
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            {/* Private */}
            <Route path="/*" element={<RegisterRoute currentUser={currentUser} />}>
                <Route path="my-profile" element={<MyProfile />} />
            </Route>
            <Route path="/*" element={<PrivateRoute currentUser={currentUser} />}>                
                <Route path="forgot" element={<ForgotPassword />} />
                <Route path="update-profile" element={<UpdateProfile />} />
            </Route>
            {/* Admin */}
            <Route path="/*" element={<AdminRoute currentUser={currentUser} />}>
                <Route path="admin/" element={<Navigate to="admin/home" />} />
                <Route path="admin/home" element={<AdminHome />} />            
            </Route>
            {/* Auth */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}

export default Routers