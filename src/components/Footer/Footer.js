import React, { useContext } from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Footer = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="menu-links">
                    <Link className="menu-link" to="/main-menu">Main menu</Link>
                    <Link className="menu-link" to="/mijn-bar">Mijn bar</Link>
                    <Link className="menu-link" to="/favorieten">Favorieten</Link>
                    <Link className="menu-link" onClick={handleLogout} to="/">
                        Log uit
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
