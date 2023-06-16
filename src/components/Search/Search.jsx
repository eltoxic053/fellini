import React, { useState } from 'react';
import axios from "axios";
import "./Search.css";
import {useNavigate} from "react-router-dom";

const Search = ({ onSearch, position,  handlePopupClose }) => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (position === 'right') {
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm.trim()}`
                );
                const cocktails = response.data.drinks || [];
                const queryParams = new URLSearchParams();
                queryParams.append('searchTerm', searchTerm.trim());
                cocktails.forEach((cocktail) => {
                    queryParams.append('names[]', cocktail.strDrink);
                    queryParams.append('thumbnails[]', cocktail.strDrinkThumb);
                    queryParams.append('id[]', cocktail.idDrink);
                });
                onSearch(cocktails);
                setSearchTerm('');
            } catch (error) {
                console.error(error);
            }
        } else if (position === 'middle') {
            if (searchTerm.trim() !== '') {
                try {
                    const response = await axios.get(
                        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm.trim()}`
                    );
                    const cocktails = response.data.drinks || [];
                    const queryParams = new URLSearchParams();
                    queryParams.append('searchTerm', searchTerm.trim());
                    cocktails.forEach((cocktail) => {
                        queryParams.append('names[]', cocktail.strDrink);
                        queryParams.append('thumbnails[]', cocktail.strDrinkThumb);
                        queryParams.append('id[]', cocktail.idDrink);
                    });
                    navigate(`/searchresultspage?${queryParams.toString()}`);
                    setSearchTerm('');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            handlePopupClose();
        }
    };

    return (
        <div className={`search-form-1 ${position === 'middle' ? 'search-form-1-middle' : 'search-form-1-right'}`}>
                <div className="popup">
                    <input className="search-input" type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
                    <button className="button-search" onClick={() => {handleSearch(); handlePopupClose();
                    }}>Search</button>
            </div>
        </div>
    );
};

export default Search;
