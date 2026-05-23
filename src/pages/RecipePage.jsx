import React from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../data/recipes';
import '../styles/RecipePage.css';
import ShareButtons from '../components/ShareButtons';

const RecipePage = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) return <div>Рецепт не найден</div>;

  return (
    <div className="recipe-page">
      <Link to="/" style={{color: '#8B0000'}}>← На главную</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <span className="badge">{recipe.era}</span>
      </div>

      <img src={recipe.image} alt={recipe.title} className="main-image" />
      
      <p className="description">{recipe.description}</p>

      <div className="recipe-details">
        <div className="detail-block">
          <h3>Ингредиенты:</h3>
          <ul>
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
        
        <div className="detail-block">
          <h3>Приготовление:</h3>
          <ol>
            {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>
      </div>
      <ShareButtons title={recipe.title} />
    </div>
  );
};

export default RecipePage;