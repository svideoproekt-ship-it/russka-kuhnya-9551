// src/pages/SoupCategory.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soupsData } from '../data/soupsData';
import RecipeCard from '../components/RecipeCard';
import ShareButtons from '../components/ShareButtons';
import './SoupCategory.css';

function SoupCategory() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedRecipe) {
    return (
      <div className="soup-category">
        <button className="back-button" onClick={handleBack}>
          ← Назад к списку
        </button>
        
        <div className="recipe-detail">
          <div className="recipe-header">
            <h1>{selectedRecipe.name}</h1>
            
            {/* Кнопки поделиться на странице рецепта */}
            <ShareButtons 
              title={selectedRecipe.name}
              url={`${window.location.origin}/category/soups`}
              compact
            />
            
            <div className="recipe-meta">
              <span className="epoch">🕰 {selectedRecipe.epoch}</span>
              <span className="time">⏱ {selectedRecipe.time}</span>
            </div>
          </div>

          {selectedRecipe.image && (
            <div className="recipe-image-container">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name}
                className="recipe-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото';
                }}
              />
            </div>
          )}

          <div className="recipe-content">
            <div className="recipe-section">
              <h2>📝 Ингредиенты</h2>
              <ul className="ingredients-list">
                {selectedRecipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h2>👨‍🍳 Приготовление</h2>
              <ol className="preparation-list">
                {selectedRecipe.preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="recipe-section history-section">
              <h2>📚 Историческая справка</h2>
              <p className="history-text">{selectedRecipe.history}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="soup-category">
      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🍲 Супы</h1>
        <p className="category-description">
          Традиционные русские супы от древности до наших дней
        </p>
      </div>

      <div className="recipes-grid">
        {soupsData.map((recipe) => (
          <div key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
            <RecipeCard 
              recipe={{
                id: recipe.id,
                title: recipe.name,
                category: 'Супы',
                era: recipe.epoch,
                time: recipe.time,
                difficulty: 'Средне',
                image: recipe.image || 'https://via.placeholder.com/300x200?text=Нет+фото'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoupCategory;