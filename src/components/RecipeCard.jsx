import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import ShareButtons from './ShareButtons';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="card-link">
        <div className="card-image" style={{ backgroundImage: `url(${recipe.image})` }}>
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
      
      {/* Кнопка поделиться снаружи ссылки */}
      <div className="card-share">
        <ShareButtons 
          title={recipe.title}
          url={`${window.location.origin}/recipe/${recipe.id}`}
          compact
        />
      </div>
    </div>
  );
};

export default RecipeCard;