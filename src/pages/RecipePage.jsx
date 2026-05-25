import React from 'react';
import { useParams, Link } from 'react-router-dom';
import allRecipes from '../data/recipes';
import '../styles/RecipePage.css';
import ShareButtons from '../components/ShareButtons';

const RecipePage = () => {
  const { id } = useParams();
  const recipe = allRecipes.find(r => 
    r.id === id || r.id === parseInt(id) || String(r.id) === String(id)
  );

  // Определяем цвет категории
  const getCategoryColor = () => {
    const category = recipe?.category?.toLowerCase() || '';
    
    if (category.includes('суп') || category.includes('щи') || category.includes('борщ')) return '#00897b';
    if (category.includes('выпечк') || category.includes('блин') || category.includes('пирог')) return '#ff9800';
    if (category.includes('мясн') || category.includes('мясо')) return '#d32f2f';
    if (category.includes('рыб') || category.includes('рыба')) return '#1976d2';
    if (category.includes('десерт') || category.includes('сладк')) return '#e91e63';
    if (category.includes('напитк') || category.includes('drink')) return '#9c27b0';
    if (category.includes('закуск') || category.includes('салат')) return '#4caf50';
    
    return '#ff9800'; // По умолчанию оранжевый
  };

  const categoryColor = getCategoryColor();

  if (!recipe) return <div>Рецепт не найден</div>;

  return (
    <div className="recipe-page" style={{ '--category-color': categoryColor }}>
      <div className="recipe-container">
        <Link to="/" className="back-link">← На главную</Link>
        
        <div className="recipe-header">
          <h1>{recipe.title || recipe.name}</h1>
          <div className="recipe-meta">
            {recipe.epoch && <span className="meta-item">🏛 {recipe.epoch}</span>}
            {recipe.time && <span className="meta-item"> {recipe.time}</span>}
          </div>
        </div>

        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title || recipe.name} 
            className="recipe-image" 
          />
        )}

        <div className="recipe-section">
          <h2>📝 Ингредиенты</h2>
          <ul>
            {(recipe.ingredients || []).map((item, index) => (
              <li key={index}>
                {typeof item === 'string' 
                  ? item 
                  : `${item.name} - ${item.amount} ${item.unit}`
                }
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>‍🍳 Приготовление</h2>
          <ol>
            {(recipe.steps || recipe.preparation || []).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {recipe.history && (
          <div className="recipe-section history-section">
            <h2>📚 Историческая справка</h2>
            <p>{recipe.history}</p>
          </div>
        )}

        <ShareButtons title={recipe.title || recipe.name} />
      </div>
    </div>
  );
};

export default RecipePage;