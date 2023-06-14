import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const login = async (username, password) => {

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", { username, password });
            const token = response.data.accessToken;
            localStorage.setItem('authToken', token);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
