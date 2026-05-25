// src/pages/RecipePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../data/recipes';
import { soupsData } from '../data/soupsData';
import { bakingData } from '../data/bakingData';
import { meatData } from '../data/meatData';
import { fishData } from '../data/fishData';
import { snacksData } from '../data/snacksData';
import { dessertsData } from '../data/dessertsData';
import { drinksData } from '../data/drinksData';
import { doughData } from '../data/doughData';
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  // Объединяем все источники данных
  const allRecipes = [
    ...recipes,
    ...soupsData.map(r => ({
      ...r,
      title: r.name,
      ingredients: r.ingredients,
      steps: r.preparation
    })),
    // ... можно добавить остальные категории при необходимости
  ];

  // Ищем по id (и строковому, и числовому)
  const recipe = allRecipes.find(r => 
    r.id === id || r.id === parseInt(id) || String(r.id) === String(id)
  );

  if (!recipe) return <div>Рецепт не найден</div>;

  return (
    <div className="recipe-page">
      <Link to="/" className="back-link">← На главную</Link>
      
      <div className="recipe-container">
        <h1>{recipe.title || recipe.name}</h1>
        
        
       <ShareButtons title={recipe.title || recipe.name} /> 
        
        <div className="recipe-meta">
          <span>🕰 {recipe.epoch}</span>
          <span>⏱ {recipe.time}</span>
        </div>

        {recipe.image && (
          <img src={recipe.image} alt={recipe.title || recipe.name} className="recipe-image" />
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
          <h2>👨‍🍳 Приготовление</h2>
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
      </div>
    </div>
  );
};

export default RecipePage;