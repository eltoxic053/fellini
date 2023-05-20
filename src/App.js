import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { LoginProvider, useLoginContext, LoginPage } from "./pages/login/Login";
import Navbar from "./components/Navbar/Navbar";
import MainMenu from "./pages/mainmenu/mainmenu";
import Recept from "./pages/recept/recept";
import MijnBar from "./pages/mijnbar/MijnBar";
import Footer from "./components/Footer/Footer";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import Registration from "./pages/registration/registration";
import UserProfile from "./pages/userprofile/userProfile";
import Favorite from "./pages/favorieten/favorite";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('authToken')
    );

    const handleAuthentication = (accessToken) => {
        localStorage.setItem('authToken', accessToken);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    const LoginRequiredPage = () => {
        return (
            <div>
                <Navigate to="/" />
            </div>
        );
    };

    return (
        <div>
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <LoginProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/main-menu" element={<MainMenu />} />
                        <Route path="/recept" element={<Recept />} />
                        <Route path="/mijn-bar" element={<MijnBar />} />
                        <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
                        <Route path="/userProfile" element={<UserProfile />} />
                        <Route path="/Favorieten" element={<Favorite />} />
                    </Routes>
                </LoginProvider>
                {isAuthenticated && <Footer />}
            </BrowserRouter>
        </div>
    );
}

export default App;
