// components/RecipeCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import './RecipeCard.css';

const RecipeCard = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const recipeId = data.isCustom ? data._id : data.id;

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isRecipeFavorite = storedFavorites.some(recipe => recipe.id === recipeId);
        setIsFavorite(isRecipeFavorite);
    }, [recipeId]);

    const handleFavoriteToggle = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = storedFavorites.filter(recipe => recipe.id !== recipeId);
        } else {
            updatedFavorites = [...storedFavorites, { ...data, id: recipeId }];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="recipe-card-container">
            <Link to={data.isCustom ? `/myrecipe/${recipeId}` : `/recipe/${recipeId}`}>
                <img src={data.isCustom ? data.imageUrl : data.image} className="recipe-img" alt={data.title || data.recipeName} />
                <h2 className="recipe-p">{data.title || data.recipeName}</h2>
                <div className="recipe-gradient"></div>
            </Link>

            <div className="favorite-icon" onClick={handleFavoriteToggle}>
                {isFavorite ? (
                    <Favorite className="favorite" style={{ color: 'red', fontSize: '24px' }} />
                ) : (
                    <FavoriteBorder className="not-favorite" style={{ color: 'black', fontSize: '24px' }} />
                )}
            </div>
        </div>
    );
};

export default RecipeCard;
