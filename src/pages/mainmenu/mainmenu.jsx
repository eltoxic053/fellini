import React, { useState, useEffect, useContext } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './mainmenu.css';

function MainMenu() {
    const [cocktails, setCocktails] = useState([]);
    const navigate = useNavigate();

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const cocktail = response.data.drinks[0];
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
            console.log(error);
        }
    };

    const fetchData = async (urls) => {
        try {
            const responses = await Promise.all(urls.map((url) => axios.get(url)));
            const cocktails = responses.map((response) => response.data.drinks[0]);
            setCocktails(cocktails);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const randomCocktailUrls = Array.from({ length: 5 }, () => 'https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const iconicCocktailUrls = [
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11117',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11009',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178357',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11002',
        ];
        const classicCocktailUrls = [
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11202',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178325',
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17212',
        ];

        fetchData([...randomCocktailUrls, ...iconicCocktailUrls, ...classicCocktailUrls]);
    }, []);

    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    const renderCocktailGrid = (cocktailList, start, end) => {
        return cocktailList.slice(start, end).map((cocktail, index) => (
            <div className="image" key={index}>
                <img   src={cocktail.strDrinkThumb} alt="Cocktail" onClick={() => handleClick(cocktail.idDrink)} />
                <p   onClick={() => handleClick(cocktail.idDrink)}>{cocktail.strDrink}</p>
            </div>
        ));
    };

    return (
        <div className="mainmenu">
            <div className="cocktail-tile">
                <h1>Cocktails to discover</h1>
            </div>
            <div className="mainmenu-grid-container">
                {renderCocktailGrid(cocktails, 0, 5)}
            </div>
            <div className="main-grid-container-classic-iconic">
                <div className="container-classic">
                    <h2 className="title-classic">Classic cocktails</h2>
                    <div className="images-row-classic">
                        {renderCocktailGrid(cocktails, 5, 9)}
                    </div>
                </div>
                <div className="container-iconic">
                    <h2 className="title-iconic">Iconic cocktails</h2>
                    <div className="images-row-iconic">
                        {renderCocktailGrid(cocktails, 9, 13)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;
