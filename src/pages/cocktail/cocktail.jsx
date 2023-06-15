import React, { useEffect, useRef, useState } from 'react';
import './cocktail.css';
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search/Search";

const Cocktail = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 4;
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);
    const [selectedResult, setSelectedResult] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [currentPageFav, setCurrentPageFav] = useState(1);
    const [cocktailsPerPage] = useState(4);
    const totalFavPages = Math.ceil(favorites.length / cocktailsPerPage);
    const token = localStorage.getItem('authToken');

    const goToPreviousPage = () => {
        setCurrentPageFav(currentPageFav - 1);
    };

    const goToNextPage = () => {
        setCurrentPageFav(currentPageFav + 1);
    };

    const startFav = (currentPageFav - 1) * resultsPerPage;
    const endFav = startFav + resultsPerPage;

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;

    const handleSearch = (cocktails) => {
        setSearchResults(cocktails);
        setPopupVisible(true);
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
                    console.log(response.data.info);
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
            console.log(response.data);
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
        setTimeout(getFavorites, 5000);
    }

    const handleReceptClick = (id) => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                console.log(response);
                const cocktail = response.data.drinks[0];
                console.log(response.data);
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

                navigate(`/recept?id=${id}&${queryParams.toString()}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getFavorites();
    }, []);





    return (
        <div className="cocktails-form">
            <Sidebar position='left'/>
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
            <Search position="right" onSearch={handleSearch} />
            {popupVisible && (
                <div className="cocktails-form-2">
                    {searchResults.length === 0 ? (
                        <p>Geen zoekresultaten</p>
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
    );
}

export default Cocktail;
