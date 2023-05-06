import React, {useEffect, useRef, useState} from "react";
import './userProfile.css'
import home from '../../assets/home.png';
import user from '../../assets/user.png';
import martini from '../../assets/solidglass.png'
import axios from "axios";
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";
import editprofile from "../../assets/editprofile.jpg"

function UserProfile() {

    const [userData, setUserData] = useState(null);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCocktailsForm, setShowCocktailsForm] = useState(false);
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 4;
    const totalPages = Math.ceil(searchResults.length / resultsPerPage)
    const [selectedResult, setSelectedResult] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [currentPageFav, setCurrentPageFav] = useState(1);
    const [cocktailsPerPage] = useState(4)
    const totalFavPages = Math.ceil(favorites.length / cocktailsPerPage)
    const [base64Image, setBase64Image] = useState('');
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('authToken');

    const goToPreviousPage = () => {
        setCurrentPageFav(currentPageFav - 1);
    };

    const goToNextPage = () => {
        setCurrentPageFav(currentPageFav + 1);
    };

    const startFav = (currentPageFav - 1) * resultsPerPage;
    const endFav = startFav + resultsPerPage

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm.trim()}`)
                .then(response => {
                    const cocktails = response.data.drinks || [];
                    const queryParams = new URLSearchParams();
                    queryParams.append('searchTerm', searchTerm.trim());
                    cocktails.forEach(cocktail => {
                        queryParams.append('names[]', cocktail.strDrink);
                        queryParams.append('thumbnails[]', cocktail.strDrinkThumb);
                        queryParams.append('id[]', cocktail.idDrink)
                    });
                    setSearchResults(cocktails);
                    setPopupVisible(true);

                });
        }

    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };




    const saveToFavorites = () => {
        axios
            .get("https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                let favoritesBase64 = "";
                if (response.data.info) {
                    console.log(response.data.info)
                    const currentFavoritesJSON = atob(response.data.info);
                    const currentFavorites = JSON.parse(currentFavoritesJSON);


                    if (currentFavorites.includes(selectedResult.idDrink)) {
                        console.error("Dit drankje staat al in je favorietenlijst!");
                        return;
                    }


                    currentFavorites.push(selectedResult.idDrink);


                    favoritesBase64 = btoa(JSON.stringify(currentFavorites));
                } else {

                    const newFavorites = [selectedResult.idDrink];


                    favoritesBase64 = btoa(JSON.stringify(newFavorites));
                }

                axios
                    .put(
                        "https://frontend-educational-backend.herokuapp.com/api/user",
                        {
                            info: favoritesBase64,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFavorites = async () => {
        try {
            const response = await axios.get(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userInfo = atob(response.data.info);
            console.log(response.data)
            const ids = userInfo.split(",").map((id) => id.replace(/\D/g, ""));
            console.log(ids);

            const promises = ids.map((id) =>
                axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                )
            );

            const responses = await Promise.all(promises);
            const favoritesData = responses.map((response) => response.data.drinks[0]);
            setFavorites(favoritesData);
        } catch (error) {
            console.log(error);
        }
    };

    function buttonWithTwoEvents() {
        saveToFavorites();
        setTimeout(getFavorites, 5000)
    }


    const handleReceptClick = (id) => {

        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                console.log(response)
                const cocktail = response.data.drinks[0];
                console.log(response.data)
                const cocktailDetails = {
                    name: cocktail.strDrink,
                    instructions: cocktail.strInstructions,
                    ingredients: []
                };

                for (let i = 1; i <= 15; i++) {
                    const ingredient = cocktail[`strIngredient${i}`];
                    const measure = cocktail[`strMeasure${i}`];

                    if (ingredient && measure) {
                        cocktailDetails.ingredients.push({ ingredient, measure });
                    }
                }

                const queryParams = new URLSearchParams();
                queryParams.append('name', cocktailDetails.name);
                queryParams.append('instructions', cocktailDetails.instructions);
                queryParams.append('strDrinkThumb', cocktail.strDrinkThumb);
                cocktailDetails.ingredients.forEach((ingredient, index) => {
                    queryParams.append(`ingredient${index + 1}`, `${ingredient.ingredient} - ${ingredient.measure}`);
                });

                window.location.href = `/recept?id=${id}&${queryParams.toString()}`;
            })
            .catch(error => {
                console.log(error);

            })
    };

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


    const reloadPage =() => {
        window.location.reload(false)
    }
    function buttonWithMoreEvents() {
        handleButtonSubmit();
        setTimeout(reloadPage, 2000)
    }


    const cancelClick = () => {
        setBase64Image('');
        fileInputRef.current.value = null;
        setPassword("");
        setConfirmPassword("");
        setShowEditForm(false);
    }

    const handleEditClick = () => {
        setShowProfileInfo(true);
        setShowEditForm(true);
        setShowCocktailsForm(false);
    };

    const handleDashboardClick = () => {
        setShowProfileInfo(true);
        setShowEditForm(false);
        setShowCocktailsForm(false);

    };

    const handleCocktailsClick = () => {
        getFavorites(true);
        setShowCocktailsForm(true);
        setShowProfileInfo(false);
        setShowEditForm(false);
};






     return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="menu-dashboard-1">
                    <div className="menu-dashboard">
                        <div className="menu-group">
                            <img className="menu-dashboard-home" src={home} alt='home' onClick={handleDashboardClick} />
                            <p onClick={handleDashboardClick} className="menu-user-label">Dashboard</p>
                        </div>
                    </div>
                    <div className="menu-dashboard">
                        <div className="menu-group">
                            <img className="menu-dashboard-home" src={user} alt='user' onClick={handleEditClick}/>
                            <p onClick={handleEditClick} className="menu-user-label">Account bewerken</p>
                        </div>
                    </div>
                    <div className="menu-dashboard">
                        <div className="menu-group">
                            <img className="menu-dashboard-home" src={martini} alt='user' onClick={handleCocktailsClick} />
                            <p onClick={handleCocktailsClick} className="menu-user-label">Cocktails</p>
                        </div>
                    </div>

                </div>
                {showProfileInfo && userData && (
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
                )}
                                {showEditForm && (
                                    <div className="edit-form">
                                        <div className="edit-form-container">
                                            <div className="edit-form-profile-edit">
                                                <label htmlFor="fileInput">
                                                    {base64Image ? (
                                                        <img className="edit-profile-edit-form" src={base64Image} alt="Uploaded Image" onClick={handleImageClick} />
                                                    ) : (
                                                        <img className="edit-profile-edit-form" src={editprofile} alt="Edit Profile" onClick={handleImageClick} />
                                                    )}
                                                </label>
                                                <p3  className="edit-profile-edit-form-text">Profielfoto bewerken</p3>
                                                <input id="fileInput" type="file" onChange={handleImageUpload} ref={fileInputRef} style={{ display: 'none' }} />
                                            </div>

                                                <div className="form-group-group">
                                                    <div className="form-group">
                                                        <label htmlFor="password" className="form-label-edit">Wachtwoord</label>
                                                        <input type="password" autoComplete="new-password" className="form-control-edit" id="password" placeholder="Voer wachtwoord in" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="confirm-password" className="form-label-edit">Bevestig Wachtwoord</label>
                                                        <input type="password" className="form-control-edit" id="confirm-password" placeholder="Bevestig wachtwoord" value={repeatedPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                    </div>
                                                </div>
                                            <div className="form-group-group">
                                                <div className="form-group">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="form-label-edit">Email</label>
                                                        <input type="email" className="form-control-edit" id="email" placeholder="Voer email in" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                    </div>
                                                </div>

                                            <div className="form-group">
                                                <div className="button-container-edit-form">
                                                    <button onClick={cancelClick} className="cancel-button-edit-form">Cancel</button>
                                                    <button onClick={buttonWithMoreEvents} className="registration-button-edit-form" >Change</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                                    </div>

                                )}

                {showCocktailsForm && (
                    <div className="cocktails-form">
                        <div className="cocktails-form-container">
                            <h1>Favoriete Cocktails</h1>
                            <div className="cocktails-form-container-1">
                                {favorites.slice(startFav, endFav).map((favorite) => (
                                    <div key={favorite.idDrink}>
                                        <div  className="images-cocktails-standard-1">
                                            <img  onClick={() => handleReceptClick(favorite.idDrink)} className="favorite-cocktail-userprofile" src={favorite.strDrinkThumb} alt={favorite.strDrink} />
                                            <h3  onClick={() => handleReceptClick(favorite.idDrink)}>{favorite.strDrink}</h3>

                                        </div>
                                    </div>
                                ))}
                        </div>
                            <div className="pagination-2">
                                {currentPageFav > 1 && (
                                        <img onClick={goToPreviousPage} src={solidleft} alt="Previous Page" />
                                )}
                                {currentPageFav < totalFavPages && (
                                        <img onClick={goToNextPage} src={solidright} alt="Next Page" />
                                )}
                            </div>

                        </div>
                        <div className="cocktails-form-1">
                            <input className="search-input" type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress}/>
                            <button className="button-search" onClick={handleSearch}>Search</button>
                        </div>

                        {popupVisible && (
                        <div className="cocktails-form-2">
                            {searchResults.length === 0 ? (
                                <p>No search results found</p>
                            ) : (
                                <div className="cocktails-list">
                                    {searchResults.slice(start,end).map((result) => (
                                        <div key={result.idDrink} className="cocktails-list-standard">
                                            <img onClick={() => setSelectedResult(result)} style={selectedResult === result ? {border: "2px solid #0000FF"} : {}} src={result.strDrinkThumb} alt={result.strDrink} />
                                            <div className="cocktails-list-name-standard">
                                                <p onClick={() => setSelectedResult(result)}>{result.strDrink}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            )}
                            <div className="pagination-1">
                                <div>
                                {currentPage > 1 && (
                                    <img src={solidleft} alt="Cocktail" onClick={handlePrevPage} />
                                )}
                                {currentPage < totalPages && (
                                    <img src={solidright} alt="Cocktail" onClick={handleNextPage} />
                                )}
                                </div>
                                <button onClick={event => {buttonWithTwoEvents()}}  className="button-favorite" >Voeg toe aan Favorieten</button>
                            </div>

                        </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );

}

export default UserProfile;
