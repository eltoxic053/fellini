import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import "./favorite.css";
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";
import { useNavigate } from 'react-router-dom';

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("authToken");
    const [imageURLs, setImageURLs] = useState([]);
    const [cocktailIds, setCocktailIds] = useState([]);
    const [cocktailNames, setCocktailNames] = useState([]);
    const navigate = useNavigate();

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
        const getFavorites = async () => {
            try {
                const response = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userInfo = atob(response.data.info);
                const ids = userInfo.split(",").map((id) => id.replace(/\D/g, ""));
                const promises = ids.map((id) =>
                    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                );

                const responses = await Promise.all(promises);
                const favoritesData = responses.map((response) => response.data.drinks[0]);
                setFavorites(favoritesData);
            } catch (error) {
                console.error(error);
            }
        };

        getFavorites();
    }, [token]);

    useEffect(() => {
        const ids = favorites.map((cocktail) => cocktail.idDrink);
        setCocktailIds(ids);
        setImageURLs(favorites.map((cocktail) => cocktail.strDrinkThumb));
        setCocktailNames(favorites.map((cocktail) => cocktail.strDrink));
    }, [favorites]);

    const handleReceptClick = async (id) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            console.log(response);
            const cocktail = response.data.drinks[0];
            console.log(response.data);
            const cocktailDetails = {
                name: cocktail.strDrink,
                instructions: cocktail.strInstructions,
                ingredients: [],
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
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container-favorite">
            <h1>Favorieten</h1>
            <div className="images-cocktails-favorite">
                {favorites.slice(start, end).map((favorite) => (
                    <div className="images-cocktails-favorite" key={favorite.idDrink}>
                        <img  onClick={() => handleReceptClick(favorite.idDrink)} src={favorite.strDrinkThumb} alt={favorite.strDrink} className="clickable"/>
                        <div  onClick={() => handleReceptClick(favorite.idDrink)} className="cocktail-name-favorite ">
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
    );
}

export default Favorite;
