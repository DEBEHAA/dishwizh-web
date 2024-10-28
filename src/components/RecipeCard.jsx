import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material'; // Icons for favorite and not favorite
import axios from 'axios'; // For API requests
import './RecipeCard.css';

const RecipeCard = ({ data, userId }) => {
    // State to track if the recipe is a favorite
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false); // To handle loading states

    // Check if the recipe is a favorite when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                console.log(`Fetching favorites for user ${userId}...`);
                const response = await axios.get(`http://localhost:5000/api/auth/favorites/${userId}`);
                const favoriteRecipes = response.data;
                console.log('Fetched favorite recipes:', favoriteRecipes);
                
                // Check if this recipe is in the favorites list
                if (favoriteRecipes.some(recipe => recipe.id === data.id)) {
                    setIsFavorite(true);
                    console.log(`Recipe ${data.id} is a favorite`);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        fetchFavorites();
    }, [data.id, userId]);

    // Handle toggling favorite status
    const handleFavoriteToggle = async () => {
        setLoading(true); // Disable clicks until API call finishes
        try {
            if (isFavorite) {
                console.log(`Removing recipe ${data.id} from favorites...`);
                await axios.post(`http://localhost:5000/api/auth/favorites/${userId}/remove`, { recipeId: data.id });
                setIsFavorite(false);
                console.log(`Recipe ${data.id} removed from favorites`);
            } else {
                console.log(`Adding recipe ${data.id} to favorites...`);
                await axios.post(`http://localhost:5000/api/auth/favorites/${userId}`, { recipe: data });
                setIsFavorite(true);
                console.log(`Recipe ${data.id} added to favorites`);
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        } finally {
            setLoading(false); // Allow clicks again
        }
    };

    return (
        <div className="recipe-card-container">
            <Link to={'/recipe/' + data.id}>
                <img src={data.image} className="recipe-img" alt={data.title} />
                <h2 className="recipe-p">{data.title}</h2>
                <div className="recipe-gradient"></div>
            </Link>

            {/* Favorite Icon */}
            <div className="favorite-icon" onClick={handleFavoriteToggle} style={{ pointerEvents: loading ? 'none' : 'auto' }}>
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
