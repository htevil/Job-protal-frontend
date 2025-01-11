// src/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ redirectPath = '/' }) => {
    const { token } = useAuth(); // Check if token exists for authentication

    return token ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;