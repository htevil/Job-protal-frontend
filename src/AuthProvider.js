// src/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false); // Set loading to false after checking for the token
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('userToken', newToken); // Store the token in local storage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('userToken'); // Clear the token from local storage
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};