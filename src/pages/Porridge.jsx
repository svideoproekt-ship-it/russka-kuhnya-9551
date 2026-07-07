import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { porridgeData } from '../data/porridgeData';
import './Porridge.css';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

function Porridge() {
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
      <div className="porridge-category">
        <button className="back-button" onClick={handleBack}>
          ← Назад к списку
        </button>
        
        <div className="recipe-detail">
          <div className="recipe-header">
            <ShareButtons title={selectedRecipe.name} />
            <h1>{selectedRecipe.name}</h1>
            <div className="recipe-meta">
              <span className="epoch">🕰 {selectedRecipe.epoch}</span>
              <span className="time">⏱ {selectedRecipe.time}</span>
            </div>
          </div>

          {selectedRecipe.image && (
            <div className="recipe-image-container">
              <img 
                loading="lazy"
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
              <h2>🥣 Ингредиенты</h2>
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
    <div className="porridge-category">
      <SEO 
  title="Каши — гречка, овсянка, рис, пшёнка | Русская Кухня"
  description="Лучшие рецепты русских каш: рассыпчатая гречка, нежная овсянка, ароматный рис. Пошаговые инструкции с фото!"
  keywords="каши, гречка, овсянка, рис, пшёнка, русская кухня"
  url="https://russka-kuhnya-9551.vercel.app/category/porridge"
/>
<Breadcrumbs />

      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🥣 Каши</h1>
        <p className="category-description">
          Традиционные русские каши — основа здорового питания
        </p>
      </div>

      <div className="recipes-grid">
        {porridgeData.map((recipe) => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe)}
          >
            <div className="recipe-card-image">
              {recipe.image ? (
                <img 
                  loading="lazy"
                  src={recipe.image} 
                  alt={recipe.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото';
                  }}
                />
              ) : (
                <div className="no-image">🥣</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span>⏱ {recipe.time}</span>
              </div>
              <button className="view-recipe-btn">
                Смотреть рецепт
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Porridge;