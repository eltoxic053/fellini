import React, { useContext, useState } from 'react';
import "./SearchResultsPage.css";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";
import { AuthContext } from "../../Context/AuthContext";

const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('searchTerm');
    const names = queryParams.getAll('names[]');
    const ids = queryParams.getAll('id[]');
    const thumbnails = queryParams.getAll('thumbnails[]');
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const totalPages = Math.ceil(names.length / resultsPerPage);
    const navigate = useNavigate();
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            console.log(response);
            const cocktail = response.data.drinks[0];
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
        } catch (error) {
            console.log(error);
        }
    };


    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="search-results">
            <div className="header">
                <h1>Zoek resultaten: {searchTerm}</h1>
            </div>
            {names.length === 0 ? (
                <div className="no-results">Geen resultaten gevonden</div>
            ) : (
                <div className="grid-container">
                    {names.slice(start, end).map((name, index) => (
                        <div key={index} >
                            <h2>{name}</h2>
                            <div className="search-image">
                                <img src={thumbnails[index]} alt={name} onClick={() => handleClick(ids[index])} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
};

export default SearchResultsPage;
