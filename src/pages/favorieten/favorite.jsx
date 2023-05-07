import React, { useState, useEffect } from "react";
import axios from "axios";
import "./favorite.css";
import solidleft from "../../assets/solidleft.png";
import solidright from "../../assets/solidright.png";

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("authToken");
    const [imageURLs, setImageURLs] = useState([]);
    const [cocktailIds, setCocktails] = useState([]);
    const [cocktailNames, setCocktailNames] = useState([])




    const screenWidth = window.innerWidth;
    let resultsPerPage = 9;
    if (screenWidth < 767) {
        resultsPerPage = 3;
    }




    const [currentPage, setCurrentPage] = useState(1);
    const start = (currentPage - 1) * resultsPerPage;
    const end = Math.min(start + resultsPerPage, cocktailIds.length);
    const totalPages = Math.ceil(cocktailIds.length / resultsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
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

    useEffect(() => {
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
                const ids = userInfo.split(",").map((id) => id.replace(/\D/g, ""));

                setCocktails(ids);
            } catch (error) {
                console.log(error);
            }
        };

        getFavorites();
    }, [token]);


    return (
        <div className="container">
            <h1>Favorieten</h1>
            <div className="images-cocktails-standard">
                {favorites.slice(start, end).map((favorite) => (
                    <div className="images-cocktails-standard">
                        <img src={favorite.strDrinkThumb} alt={favorite.strDrink}/>
                        <div className="cocktail-name-standard ">
                            <p>{favorite.strDrink}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <img src={solidleft} alt="Cocktail" onClick={handlePrevPage}/>
                )}
                {currentPage < totalPages && (
                    <img src={solidright} alt="Cocktail" onClick={handleNextPage}/>
                )}
            </div>
        </div>
    )

}

export default Favorite;
