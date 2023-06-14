import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom'
import {AuthContext} from "../../Context/AuthContext";
import "./favorite.css";
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("authToken");
    const [imageURLs, setImageURLs] = useState([]);
    const [cocktailIds, setCocktailIds] = useState([]);
    const [cocktailNames, setCocktailNames] = useState([])


    const screenWidth = window.innerWidth;
    let resultsPerPage = 9;
    if (screenWidth < 767) {
        resultsPerPage = 3;
    }

    const totalPages = Math.ceil(cocktailIds.length / resultsPerPage);


    const [currentPage, setCurrentPage] = useState(1);
    const start = (currentPage - 1) * resultsPerPage;
    const end = Math.min(start + resultsPerPage, cocktailIds.length);
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    useEffect(() => {
        const getFavorites = () => {
            axios
                .get("https://frontend-educational-backend.herokuapp.com/api/user", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userInfo = atob(response.data.info);
                    const ids = userInfo.split(",").map((id) => id.replace(/\D/g, ""));
                    const promises = ids.map((id) =>
                        axios.get(
                            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                        )
                    );

                    Promise.all(promises)
                        .then((responses) => {
                            const favoritesData = responses.map(
                                (response) => response.data.drinks[0]
                            );
                            setFavorites(favoritesData);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getFavorites();
    }, [token]);

    useEffect(() => {
        const ids = favorites.map(cocktail => cocktail.idDrink);
        setCocktailIds(ids);
        setImageURLs(favorites.map(cocktail => cocktail.strDrinkThumb));
        setCocktailNames(favorites.map(cocktail => cocktail.strDrink));
    }, [favorites])


    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container-favorite">
            <h1>Favorieten</h1>
            <div className="images-cocktails-favorite">
                {favorites.slice(start, end).map((favorite) => (
                    <div className="images-cocktails-favorite">
                        <img src={favorite.strDrinkThumb} alt={favorite.strDrink}/>
                        <div className="cocktail-name-favorite ">
                            <p>{favorite.strDrink}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <img src={solidleft} alt="Cocktail" onClick={handlePrevPage} />
                )}
                {currentPage < totalPages && (
                    <img src={solidright} alt="Cocktail" onClick={handleNextPage} />
                )}
            </div>
        </div>
    )

}

export default Favorite;
