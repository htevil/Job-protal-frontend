// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/Admin/AdminPanel';
import AdminLogin from './components/Admin/AdminLogin';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard/:userId" element={<Dashboard />} />
                        <Route path="/adminpanel" element={<AdminPanel />} />
                    </Route>
                    <Route path="/admin" element={<AdminLogin />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;