import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import './RecipeCard.css';

const RecipeCard = ({ data }) => {
    // State to track if the recipe is a favorite
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if the recipe is a favorite when the component mounts
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isRecipeFavorite = storedFavorites.some(recipe => recipe.id === data.id);
        setIsFavorite(isRecipeFavorite);
    }, [data.id]);

    // Handle toggling favorite status in localStorage
    const handleFavoriteToggle = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        let updatedFavorites;
        if (isFavorite) {
            // Remove from favorites
            updatedFavorites = storedFavorites.filter(recipe => recipe.id !== data.id);
        } else {
            // Add to favorites
            updatedFavorites = [...storedFavorites, data];
        }

        // Update local storage and state
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="recipe-card-container">
            <Link to={'/recipe/' + data.id}>
                <img src={data.image} className="recipe-img" alt={data.title} />
                <h2 className="recipe-p">{data.title}</h2>
                <div className="recipe-gradient"></div>
            </Link>

            {/* Favorite Icon */}
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
