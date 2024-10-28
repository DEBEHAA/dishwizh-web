import React from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material'; // Icons for favorite and not favorite

const FavoriteIcon = ({ isFavorite, onToggle }) => {
    return (
        <div onClick={onToggle} style={{ cursor: 'pointer' }}>
            {isFavorite ? (
                <Favorite className="favorite" style={{ color: 'red', fontSize: '24px' }} />
            ) : (
                <FavoriteBorder className="not-favorite" style={{ color: 'white', fontSize: '24px' }} />
            )}
        </div>
    );
};

export default FavoriteIcon;
