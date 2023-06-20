import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationContext = React.createContext();

function useRegistrationContext() {
    return useContext(RegistrationContext);
}

function RegistrationProvider({ children }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [info, setInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleFormCancel(e) {
        e.preventDefault();
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setInfo('');
        navigate('/');
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Wachtwoorden komen niet overeen');
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Voer een geldig emailadres in');
            return;
        }

        try {
            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    username: username,
                    password: password,
                    email: email,
                    info: info,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrorMessage('Er is iets misgegaan, probeer het opnieuw');
        }
    }

    const registrationContextValue = {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        info,
        setInfo,
        errorMessage,
        setErrorMessage,
        handleFormCancel,
        handleFormSubmit,
    };

    return (
        <RegistrationContext.Provider value={registrationContextValue}>
            {children}
        </RegistrationContext.Provider>
    );
}

export { RegistrationProvider, useRegistrationContext, RegistrationContext };
