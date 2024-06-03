import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const BookRoute = ({ currentUser }) => {
    return currentUser?.usuario?.rule &&
        currentUser?.usuario?.control &&
        currentUser?.usuario?.checked ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}

export default BookRoute