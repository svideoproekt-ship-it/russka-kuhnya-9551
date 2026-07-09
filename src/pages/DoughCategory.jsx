import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doughData } from '../data/doughData'; 
import './DoughCategory.css';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

function DoughCategory() {
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
      <div className="dough-category">
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

            {selectedRecipe.usage && (
              <div className="recipe-section usage-section">
                <h2>🎯 Где использовать</h2>
                <div className="usage-text">{selectedRecipe.usage}</div>
              </div>
            )}

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
    <div className="dough-category">
      <SEO 
  title="Рецепты теста — дрожжевое, слоёное, заварное | Русская Кухня"
  description="Традиционные рецепты теста: пышное дрожжевое, хрустящее слоёное, нежное заварное. Пошаговые инструкции с фото!"
  keywords="тесто, дрожжевое тесто, слоёное тесто, заварное тесто, русская кухня"
  url="https://russka-kuhnya-9551.vercel.app/category/dough"
/>
<Breadcrumbs 
  recipeTitle={selectedRecipe.name}
  categoryName="Тесто"
  categoryPath="/category/dough"
/>

      <div className="recipes-grid">
        {doughData.map((recipe) => (
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
                <div className="no-image">🥖</div>
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

export default DoughCategory;