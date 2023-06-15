import React, { useRef, useState } from 'react';
import editprofile from "../../assets/editprofile.jpg";
import './account.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import AccountInfo from "../../components/accountinfo/accountInfo";

const Account = () => {
    const [password, setPassword] = useState("");
    const [repeatedPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [base64Image, setBase64Image] = useState('');
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('authToken');
    const [errorMessage, setError] = useState(null);

    const cancelClick = () => {
        setBase64Image('');
        fileInputRef.current.value = null;
        setPassword("");
        setConfirmPassword("");
    };

    const reloadPage = () => {
        window.location.reload(false);
    };

    function buttonWithMoreEvents() {
        handleButtonSubmit();
        setTimeout(reloadPage, 2000);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            setBase64Image(reader.result);
        };
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    const handleButtonSubmit = () => {
        if (base64Image) {
            axios
                .post(
                    "https://frontend-educational-backend.herokuapp.com/api/user/image",
                    { base64Image },
                    axiosConfig
                )
                .then(() => {
                    setTimeout(() => {
                        axios
                            .put(
                                "https://frontend-educational-backend.herokuapp.com/api/user",
                                { email },
                                axiosConfig
                            )
                            .then(() => {
                                axios
                                    .put(
                                        "https://frontend-educational-backend.herokuapp.com/api/user",
                                        { password, repeatedPassword },
                                        axiosConfig
                                    )
                                    .then(() => {
                                        setBase64Image("");
                                        fileInputRef.current.value = null;
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Error uploading image", error);
                });
        } else {
            axios
                .put(
                    "https://frontend-educational-backend.herokuapp.com/api/user",
                    { email },
                    axiosConfig
                )
                .then(() => {
                    axios
                        .put(
                            "https://frontend-educational-backend.herokuapp.com/api/user",
                            { password, repeatedPassword },
                            axiosConfig
                        )
                        .then(() => {
                            setBase64Image("");
                            fileInputRef.current.value = null;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="edit-form">
            <Sidebar position='left' />
            <AccountInfo/>
            <div className="edit-form-container">
                <div className="edit-form-profile-edit">
                    <label htmlFor="fileInput">
                        {base64Image ? (
                            <img
                                className="edit-profile-edit-form"
                                src={base64Image}
                                alt="Uploaded Image"
                                onClick={handleImageClick}
                            />
                        ) : (
                            <img
                                className="edit-profile-edit-form"
                                src={editprofile}
                                alt="Edit Profile"
                                onClick={handleImageClick}
                            />
                        )}
                    </label>
                    <p3 className="edit-profile-edit-form-text">Profielfoto bewerken</p3>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="form-group-group">
                    <div className="form-group">
                        <label htmlFor="password" className="form-label-edit">Wachtwoord</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="form-control-edit"
                            id="password"
                            placeholder="Voer wachtwoord in"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password" className="form-label-edit">Bevestig Wachtwoord</label>
                        <input
                            type="password"
                            className="form-control-edit"
                            id="confirm-password"
                            placeholder="Bevestig wachtwoord"
                            value={repeatedPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-group">
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label-edit">Email</label>
                            <input
                                type="email"
                                className="form-control-edit"
                                id="email"
                                placeholder="Voer email in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="button-container-edit-form">
                            <button onClick={cancelClick} className="cancel-button-edit-form">Cancel</button>
                            <button onClick={buttonWithMoreEvents} className="registration-button-edit-form">Change</button>
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Account;
