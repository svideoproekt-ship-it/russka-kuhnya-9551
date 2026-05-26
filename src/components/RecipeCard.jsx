import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="card-link">
        {/* ИСПРАВЛЕНО: используем <img> вместо backgroundImage */}
        <div className="card-image">
          <img src={recipe.image} alt={recipe.title} />
          <span className="era-badge">{recipe.era}</span>
        </div>
        
        <div className="card-content">
          <h3>{recipe.title}</h3>
          <p className="category">{recipe.category}</p>
          <div className="card-meta">
            <span><Clock size={16} /> {recipe.time}</span>
            <span><ChefHat size={16} /> {recipe.difficulty}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;