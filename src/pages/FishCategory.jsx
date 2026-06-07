import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fishData } from '../data/fishData';
import './FishCategory.css';

function FishCategory() {
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
      <div className="fish-category">
        <button className="back-button" onClick={handleBack}>← Назад к списку</button>
        <div className="recipe-detail">
          <div className="recipe-header">
            <h1>{selectedRecipe.name}</h1>
            <div className="recipe-meta">
              <span>🕰 {selectedRecipe.epoch}</span>
              <span>⏱ {selectedRecipe.time}</span>
            </div>
          </div>
          <ShareButtons title={selectedRecipe.name} />
          {selectedRecipe.image && (
            <div className="recipe-image-container">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="recipe-image" />
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
              <h2>👨‍ Приготовление</h2>
              <ol className="preparation-list">
                {selectedRecipe.preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            {selectedRecipe.history && (
              <div className="recipe-section history-section">
                <h2>📚 Историческая справка</h2>
                <p className="history-text">{selectedRecipe.history}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fish-category">
      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🐟 Рыбные блюда</h1>
        <p className="category-description">Традиционные русские рыбные блюда</p>
      </div>
      <div className="recipes-grid">
        {fishData.map((recipe) => (
          <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
            <div className="recipe-card-image">
              <img src={recipe.image} alt={recipe.name} />
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span>⏱ {recipe.time}</span>
              </div>
              <button className="view-recipe-btn">Смотреть рецепт</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FishCategory;