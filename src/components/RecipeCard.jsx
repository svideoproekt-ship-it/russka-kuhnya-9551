import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, disableLink = false }) => {
  // Если disableLink = true, не рендерим Link, а просто div
  const CardWrapper = disableLink ? 'div' : Link;
  const wrapperProps = disableLink 
    ? { className: 'card-container' } 
    : { to: `/recipe/${recipe.id}`, className: 'card-link' };

  return (
    <CardWrapper {...wrapperProps}>
      <div className="recipe-card">
        <div className="card-image">
          <img src={recipe.image} alt={recipe.title} />
          {recipe.era && <span className="era-badge">{recipe.era}</span>}
        </div>
        
        <div className="card-content">
          <h3>{recipe.title}</h3>
          {recipe.category && <p className="category">{recipe.category}</p>}
          
          <div className="card-meta">
            {recipe.time && <span>⏱ {recipe.time}</span>}
            {recipe.difficulty && <span>📊 {recipe.difficulty}</span>}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default RecipeCard;