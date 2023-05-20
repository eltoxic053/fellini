import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registration.css';

// Context voor registratiegegevens
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

function Registration() {
    const {
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
    } = useRegistrationContext();

    return (
        <div className="registration-page">
            <div className="registration-form-container">
                <div className="registration-form">
                    <div className="form-group-group">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Gebruikersnaam
                            </label>
                            <input
                                type="text"
                                className="form-control-registration"
                                id="username"
                                placeholder="Voer gebruikersnaam in"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Wachtwoord
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="form-control-registration"
                                id="password"
                                placeholder="Voer wachtwoord in"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group-group">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control-registration"
                                id="email"
                                placeholder="Voer email in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password" className="form-label">
                                Bevestig Wachtwoord
                            </label>
                            <input
                                type="password"
                                className="form-control-registration"
                                id="confirm-password"
                                placeholder="Bevestig wachtwoord"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="button-container-registration">
                            <button className="cancel-button" onClick={handleFormCancel}>
                                Cancel
                            </button>
                            <button className="registration-button" onClick={handleFormSubmit}>
                                Registreren
                            </button>
                        </div>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export { RegistrationProvider, Registration, RegistrationContext };
