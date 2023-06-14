import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import {AuthContext} from "../../Context/AuthContext";
import './MijnBar.css';
import solidleft from '../../assets/solidleft.png'
import solidright from '../../assets/solidright.png'

function MijnBar() {


    const handleClick = (id) => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
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
            })
            .catch(error => {
                console.log(error);
            });
    }


    const [imageURLs, setImageURLs] = useState([]);
    const [cocktailId, setCocktails] = useState([]);
    const [cocktailNames, setCocktailNames] = useState([])
    const cocktailIds = [178325, 11000, 178336, 11202, 11117, 17196, 11009, 11004, 178357, 17204, 11728, 12362, 11936, 17242, 17207, 11008, 11113, 11006];



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
        Promise.all(
            cocktailIds.map(id =>
                axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            )
        )
            .then(responses => {
                const cocktails = responses.map(response => response.data.drinks[0]);
                setImageURLs(cocktails.map(cocktail => cocktail.strDrinkThumb));
                setCocktails(cocktails.map(cocktail => cocktail.idDrink));
                setCocktailNames(cocktails.map(cocktail => cocktail.strDrink));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <h1>Standaard menu kaart</h1>
            <div className="images-cocktails-standard">
                {cocktailId.slice(start, end).map((id, index) => (
                    <div className="images-cocktails-standard" key={id}>
                        <img src={imageURLs[start + index]} alt="Cocktail" onClick={() => handleClick(id)} />
                        <div className="cocktail-name-standard " onClick={() => handleClick(id)}>
                            <p>{cocktailNames[start + index]}</p>
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


export default MijnBar;
