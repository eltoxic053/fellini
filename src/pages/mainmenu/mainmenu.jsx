import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mainmenu.css';



function MainMenu() {
    const [imageURLs, setImageURLs] = useState([]);
    const [cocktailId, setCocktails] = useState([]);
    const [cocktailNames, setCocktailNames] = useState([])

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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

            window.location.href = `/recept?id=${id}&${queryParams.toString()}`;
        } catch (error) {
            console.log(error);
        }
    };
    const getRandomCocktails = () => {
        Promise.all([
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        ]).then(responses => {
            const cocktails = responses.map(response => response.data.drinks[0]);
            setImageURLs(cocktails.map(cocktail => cocktail.strDrinkThumb));
            setCocktails(cocktails.map(cocktail => cocktail.idDrink));
            setCocktailNames(cocktails.map(cocktail => cocktail.strDrink))
        }).catch(error => {
            console.log(error);
        });
    }

    const [imageURLIconic, setImageURLsIconic] = useState([]);
    const [cocktailIdIconic, setCocktailsIconic] = useState([]);
    const [cocktailNameIconic, setCocktailNamesIconic] = useState([]);
    const getIconic = async () => {
        try {
            const responses = await Promise.all([
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11117'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11009'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178357'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11002')
            ]);
            const cocktails = responses.map(response => response.data.drinks[0]);
            setImageURLsIconic(cocktails.map(cocktail => cocktail.strDrinkThumb));
            setCocktailsIconic(cocktails.map(cocktail => cocktail.idDrink));
            setCocktailNamesIconic(cocktails.map(cocktail => cocktail.strDrink));
        } catch (error) {
            console.log(error);
        }
    };

    const [imageURLClassics, setImageURLsClassics] = useState([]);
    const [cocktailIdClassics, setCocktailsClassics] = useState([]);
    const [cocktailNameClassics, setCocktailNamesClassics] = useState([]);
    const getClassics = async () => {
        try {
            const responses = await Promise.all([
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11202'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178325'),
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17212')
            ]);
            const cocktails = responses.map(response => response.data.drinks[0]);
            setImageURLsClassics(cocktails.map(cocktail => cocktail.strDrinkThumb));
            setCocktailsClassics(cocktails.map(cocktail => cocktail.idDrink));
            setCocktailNamesClassics(cocktails.map(cocktail => cocktail.strDrink));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRandomCocktails();
        getIconic()
        getClassics()
    }, []);

    return (
        <div className="mainmenu">
            <div className="cocktail-tile">
                <h1>Cocktails to discover</h1>
            </div>
            <div className="mainmenu-grid-container">
                {imageURLs.map((url, index) => (
                    <div className="images-cocktails" key={index}>
                        <img src={url} alt="Cocktail" onClick={() => handleClick(cocktailId[index])} />
                        <p onClick={() => handleClick(cocktailId[index])}>{cocktailNames[index]}</p>
                    </div>
                ))}
            </div>
            <div className="main-grid-container-classic-iconic">
            <div className="container-classic">
                <h2 className="title-classic">Classic cocktails</h2>
                <div className="images-row">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="image" key={index}>
                            <img src={imageURLClassics[index]} alt="Cocktail" onClick={() => handleClick(cocktailIdClassics[index])} />
                            <p onClick={() => handleClick(cocktailIdClassics[index])}>{cocktailNameClassics[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-iconic">
                <h2 className="title-iconic">Iconische cocktails</h2>
                <div className="images-row">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="image" key={index}>
                            <img src={imageURLIconic[index]} alt="Cocktail" onClick={() => handleClick(cocktailIdIconic[index])} />
                                <p onClick={() => handleClick(cocktailIdIconic[index])}>{cocktailNameIconic[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default MainMenu;