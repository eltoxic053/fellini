import React, { useContext } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Context/AuthContext';
import LoginPage from '../src/pages/login/Login';
import Navbar from "./components/Navbar/Navbar";
import MainMenu from "./pages/mainmenu/mainmenu";
import Recept from "./pages/recept/recept";
import MijnBar from "./pages/mijnbar/MijnBar";
import Footer from "./components/Footer/Footer";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import Account from "./pages/account/account";
import Registration from "./pages/registration/registration";
import UserProfile from "./pages/userprofile/userProfile";
import Favorite from "./pages/favorieten/favorite";
import Cocktail from "./pages/cocktail/cocktail";
import { RegistrationProvider } from './Context/registrationContext'

function App() {
    function AuthenticatedFooter() {
        const { isLoggedIn } = useContext(AuthContext);

        if (isLoggedIn) {
            return <Footer />;
        } else {
            return null;
        }
    }

    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/main-menu" element={<MainMenu />} />
                        <Route path="/recept" element={<Recept />} />
                        <Route path="/mijn-bar" element={<MijnBar />} />
                        <Route path="/searchresultspage" element={<SearchResultsPage />} />
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/favorieten" element={<Favorite />} />
                        <Route path="/userprofile/account" element={<Account />} />
                        <Route path="/userprofile/cocktails" element={<Cocktail />} />
                        <Route path="/registration" element={<RegistrationPage />} /> {/* Add this line */}
                    </Routes>
                    <AuthenticatedFooter />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

function RegistrationPage() {
    return (
        <RegistrationProvider>
            <Registration />
        </RegistrationProvider>
    );
}

export default App;
