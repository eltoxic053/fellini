import React from 'react';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import home from "../../assets/home.png";
import user from "../../assets/user.png";
import martini from "../../assets/solidglass.png";

function Menu({ position }) {
    const navigate = useNavigate();
    const dashboardClick = () => {
        navigate('/userprofile');
    };

    const accountClick = () => {
        navigate('/userprofile/account')
    }

    const cocktailClick = () => {
        navigate('/userprofile/cocktails')
    }

    return (
        <div className={`sidebar-container ${position === 'left' ? 'sidebar-left' : 'sidebar-right'}`}>
            <ul>
                <div className="dashboard-container">
                    <div className="menu-dashboard-1">
                        <div className="menu-dashboard">
                            <div className="menu-group">
                                <img onClick={dashboardClick} className="menu-dashboard-home" src={home} alt="home" />
                                <p onClick={dashboardClick} className="menu-user-label">Dashboard</p>
                            </div>
                        </div>
                        <div className="menu-dashboard">
                            <div className="menu-group">
                                <img onClick={accountClick} className="menu-dashboard-home" src={user} alt="user" />
                                <p onClick={accountClick} className="menu-user-label">Account bewerken</p>
                            </div>
                        </div>
                        <div className="menu-dashboard">
                            <div className="menu-group">
                                <img onClick={cocktailClick}  className="menu-dashboard-home" src={martini} alt="user" />
                                <p onClick={cocktailClick} className="menu-user-label">Cocktails</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default Menu;
