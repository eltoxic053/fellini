import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import fellini from '../../assets/fellini.jpg';
import search from '../../assets/search.jpg';

const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

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


    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm.trim()}`
                );
                const cocktails = response.data.drinks || [];
                const queryParams = new URLSearchParams();
                queryParams.append('searchTerm', searchTerm.trim());
                cocktails.forEach((cocktail) => {
                    queryParams.append('names[]', cocktail.strDrink);
                    queryParams.append('thumbnails[]', cocktail.strDrinkThumb);
                    queryParams.append('id[]', cocktail.idDrink);
                });
                navigate(`/searchresultspage?${queryParams.toString()}`);
                setSearchTerm('');
                setPopupVisible(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handlePopupClick = () => {
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={fellini} alt="logo" />
            </div>
            {isLoggedIn && userData && (
                <>
                    <img src={search} alt="search" className="search-icon" onClick={handlePopupClick} />
                    {popupVisible && (
                        <div className="popup-container" onClick={handlePopupClose}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <input
                                    className="popup-search"
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="popup-button" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="navbar-profile-image">
                        <Link to="/userProfile">
                            <div
                                className="profile-image-circle"
                                style={{ backgroundColor: userData.profilePicture ? 'transparent' : '#ccc' }}
                            >
                                {userData.profilePicture ? <img src={userData.profilePicture} alt="profile" /> : null}
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
