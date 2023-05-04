import React, {useState} from "react";
import "./Login.css";
import fellini from "../../assets/fellini.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data)
            const token = response.data.accessToken;
            onLogin(token);
            if (JSON.stringify(response.data.roles) === JSON.stringify(["ROLE_ADMIN"])) {
                navigate("/recept");
            } else {
                navigate("/main-menu")
            }


        } catch (error) {
            console.error(error);
            if (error.response.status === 401 || error.response.status === 404) {
                setErrorMessage("Onbekende gebruikersnaam of wachtwoord onjuist.");
            } else {
                setErrorMessage("Er is iets misgegaan bij het inloggen. Probeer het later opnieuw.");
            }
        }

    }

    return (
        <div className="login-page">
            <div className="login-form-container">
                <div className="login-form">
                    <h1 className="font-login">Login</h1>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Gebruikersnaam</label>
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
                        <label htmlFor="password" className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Wachtwoord"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="button-container">
                        <button className="login-button" onClick={handleFormSubmit}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-image-container">
                <div className="login-image">
                    <img src={fellini} alt="logo" className="logo" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
