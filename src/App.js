import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { LoginProvider, LoginPage } from "./pages/login/Login";
import Navbar from "./components/Navbar/Navbar";
import MainMenu from "./pages/mainmenu/mainmenu";
import Recept from "./pages/recept/recept";
import MijnBar from "./pages/mijnbar/MijnBar";
import Footer from "./components/Footer/Footer";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import { RegistrationProvider, Registration } from "./pages/registration/registration";
import UserProfile from "./pages/userprofile/userProfile";
import Favorite from "./pages/favorieten/favorite";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('authToken')
    );

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };


    return (
        <div>
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <RegistrationProvider>
                    <Routes>
                        <Route path="/registration" element={<Registration />} />
                    </Routes>
                </RegistrationProvider>
                <LoginProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/main-menu" element={<MainMenu />} />
                        <Route path="/recept" element={<Recept />} />
                        <Route path="/mijn-bar" element={<MijnBar />} />
                        <Route path="/searchresultspage" element={<SearchResultsPage />} />
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/favorieten" element={<Favorite />} />
                    </Routes>
                </LoginProvider>
                {isAuthenticated && <Footer />}
            </BrowserRouter>
        </div>
    );
}

export default App;
