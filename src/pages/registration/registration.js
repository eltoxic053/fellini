import React from 'react';
import { useRegistrationContext } from '../../Context/registrationContext';
import './registration.css';

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

export default Registration;
