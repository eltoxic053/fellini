import React from 'react';
import { useLocation } from 'react-router-dom';
import './recept.css';

function Recept() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const name = queryParams.get('name');
    const instructions = queryParams.get('instructions');
    const thumbnail = queryParams.get('strDrinkThumb');

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = queryParams.get(`ingredient${i}`);
        if (ingredient) {
            ingredients.push(ingredient);
        }
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
                            <li key={index}>{ingredient}</li>
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
