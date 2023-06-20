import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    logout();
                }
            }
        };

        checkLoggedInStatus();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", { username, password });
            const token = response.data.accessToken;
            localStorage.setItem('authToken', token);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setErrorMessage('');
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Inloggen mislukt. Controleer uw gebruikersnaam en wachtwoord.');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setErrorMessage('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};
