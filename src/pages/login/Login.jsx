import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import fellini from "../../assets/fellini.jpg";
import "./Login.css";


    const LoginPage = () => {
        const { isLoggedIn, login, logout } = useContext(AuthContext);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleLogin = () => {
            login(username, password);
        };

        return (
            <div className="login-page">
                <div className="login-form-container">
                    <div className="login-form">
                        <h1 className="font-login">Login</h1>
                        {isLoggedIn ? (
                            navigate("/main-menu")
                        ) : (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">
                                        Gebruikersnaam
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Gebruikersnaam"
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
                                        className="form-control"
                                        id="password"
                                        placeholder="Wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="button-container">
                                    <button className="login-button" onClick={handleLogin}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="login-image-container">
                    <div className="login-image">
                        <img src={fellini} alt="logo" className="logo" />
                    </div>
                </div>
            </div>
        );
    };
    export default LoginPage;
