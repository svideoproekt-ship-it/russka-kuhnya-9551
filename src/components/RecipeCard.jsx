import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import '../styles/RecipeCard.css';
import ShareButtons from '../components/ShareButtons';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
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
        <ShareButtons title={recipe.title} />
      </div>
    </Link>
  );
};

export default RecipeCard;