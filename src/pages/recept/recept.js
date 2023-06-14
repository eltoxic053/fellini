import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import './recept.css';

function Recept() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const name = queryParams.get('name');
    const instructions = queryParams.get('instructions');
    const thumbnail = queryParams.get('strDrinkThumb');

    const ingredients = [];
    queryParams.forEach((value, key) => {
        if (key.startsWith('ingredient')) {
            ingredients.push(value);
        }
    });

    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="recept">
            <div className="recept-header">
                <h1>{name}</h1>
            </div>
            <div className="recept-content">
                <div className="recept-ingredients">
                    <h2>Ingredients:</h2>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={`${ingredient}-${index}`}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="recept-instructions">
                    <h2>Instructions:</h2>
                    <p>{instructions}</p>
                </div>
                <div className="recept-image">
                    <img src={thumbnail} alt={name} />
                </div>
            </div>
        </div>
    );
}

export default Recept;
