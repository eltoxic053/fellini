import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ({ isAuthenticated, onLogout }) => {

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        onLogout();
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="menu-links">
                    <Link className="menu-link" to="/Main-menu">Main menu</Link>
                    <Link className="menu-link" to="/Mijn-bar">Mijn bar</Link>
                    <Link className="menu-link" to="/Favorieten">Favorieten</Link>
                    <Link className="menu-link" onClick={handleLogout} to="/">
                        Log uit
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
