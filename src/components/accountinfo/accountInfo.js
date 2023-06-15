import React, {useEffect, useState} from 'react';
import './accountinfo.css';
import axios from "axios";

const AccountInfo = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setError] = useState(null);


    useEffect(() => {
        async function fetchUserData() {
            if (!token) {
                setError("No authentication token available");
                return;
            }

            try {
                const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        fetchUserData();


    }, [token]);

    if (loading) {
        return <div>Loading...</div>;

    }
    return (
        <div className="user-profile-container">
            <div className="dashboard-container-profile-info">
                <div className="dashboard-profile-image">
                    <div className="dashboard-profile-image-container">
                        <div className="dashboard-profile-image-circle" style={{ backgroundColor: userData?.profilePicture ? 'transparent' : '#ccc' }}>
                            {userData?.profilePicture ? <img src={userData.profilePicture} alt="profile" /> : null}
                        </div>
                        <div><label>{userData.username}</label> <br />
                            <label className="userdata" >{userData.email}</label><br />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
