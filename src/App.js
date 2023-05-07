import React, { useState } from 'react';
import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/Login'
import Navbar from "./components/Navbar/Navbar";
import MainMenu from "./pages/mainmenu/mainmenu";
import Recept from "./pages/recept/recept";
import MijnBar from "./pages/mijnbar/MijnBar";
import Footer from "./components/Footer/Footer";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
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
                {isAuthenticated && <Navbar onLogout={handleLogout} />}
                <Routes>
                    <Route path="/" element={<LoginPage onLogin={handleAuthentication} />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/main-menu" element={<MainMenu />} />
                            <Route path="/recept" element={<Recept />} />
                            <Route path="/mijn-bar" element={<MijnBar />} />
                            <Route path="/SearchResultsPage" element={<SearchResultsPage />} />
                            <Route path="/userProfile" element={<UserProfile />} />
                            <Route path="/Favorieten" element={<Favorite />} />

                        </>
                    ) : (
                        <>
                            <Route path="/main-menu" element={<LoginRequiredPage />} />
                            <Route path="/recept" element={<LoginRequiredPage />} />
                            <Route path="/mijn-bar" element={<LoginRequiredPage />} />
                            <Route path="/SearchResultsPage" element={<LoginRequiredPage />} />
                            <Route path="/userProfile" element={<LoginRequiredPage />} />
                            <Route path="/Favorieten" element={<LoginRequiredPage />} />
                        </>
                    )}
                </Routes>
                {isAuthenticated && <Footer />}
            </BrowserRouter>
        </div>
    );
}

export default App;
