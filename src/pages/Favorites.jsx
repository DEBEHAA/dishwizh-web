import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Favorites = ({ userId }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch favorite recipes from the backend
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/favorites/${userId}`);
                const favorites = response.data;

                // For external recipes, fetch their details from the API
                const updatedFavorites = await Promise.all(
                    favorites.map(async (recipe) => {
                        if (recipe.source === 'api' && recipe.apiUrl) {
                            // Fetch recipe details from the external API
                            const apiResponse = await axios.get(recipe.apiUrl);
                            return { ...recipe, ...apiResponse.data };  // Combine API data with stored favorite data
                        }
                        return recipe;  // Internal recipes can be returned as is
                    })
                );

                setFavoriteRecipes(updatedFavorites);
                setLoading(false);
            } catch (err) {
                setError('Failed to load favorites');
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="favorites-container">
            <h1>Your Favorite Recipes</h1>
            {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} data={recipe} />
                ))
            ) : (
                <p>You have no favorite recipes yet.</p>
            )}
        </div>
    );
};

export default Favorites;
