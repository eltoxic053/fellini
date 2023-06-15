import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Menu from '../Sidebar/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import fellini from '../../assets/fellini.jpg';
import searchicon from '../../assets/search.jpg';
import Search from '../Search/Search';

const useClickOutside = (ref, callback) => {
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [token]);

    const handlePopupClick = () => {
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside(searchRef, handlePopupClose);
    useClickOutside(menuRef, () => setIsMenuOpen(false));

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={fellini} alt="logo" />
            </div>
            {isLoggedIn && userData && (
                <>
                    <img src={searchicon} ref={searchRef} alt="search" className="search-icon" onClick={handlePopupClick} />
                    {popupVisible && (
                        <div className="popup-container">
                            <Search position="middle" />
                        </div>
                    )}
                    <div className="navbar-profile-image" onClick={toggleMenu}>
                        <div className="profile-image-circle" style={{ backgroundColor: userData.profilePicture ? 'transparent' : '#ccc' }}>
                            {userData.profilePicture ? <img src={userData.profilePicture} alt="profile" /> : null}
                        </div>
                        <div ref={menuRef}>
                            {isMenuOpen && <Menu position="right" />}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
