import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { drinksData } from '../data/drinksData';
import './DrinksCategory.css';
import ShareButtons from '../components/ShareButtons';

function DrinksCategory() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ ДЕТАЛЬНЫЙ ПРОСМОТР РЕЦЕПТА
  if (selectedRecipe) {
    return (
      <div className="drinks-category">
        <SEO 
          title={`${selectedRecipe.name} — Русская Кухня`}
          description={selectedRecipe.history?.substring(0, 150) || selectedRecipe.name}
          keywords="напитки, русская кухня"
          url={`https://russka-kuhnya-9551.vercel.app/category/drinks?recipe=${selectedRecipe.id}`}
        />
        
        {/* 🍞 ХЛЕБНЫЕ КРОШКИ С ПРОПСАМИ — ВНУТРИ if (selectedRecipe)! */}
        <Breadcrumbs 
          recipeTitle={selectedRecipe.name}
          categoryName="Напитки"
          categoryPath="/category/drinks"
        />
        
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
              <h2>👨🍳 Приготовление</h2>
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

  // ✅ СПИСОК РЕЦЕПТОВ
  return (
    <div className="drinks-category">
      <SEO 
        title="Напитки — морсы, компоты, кисели, сбитень, квас | Русская Кухня"
        description="Традиционные русские напитки с пошаговыми рецептами: ягодные морсы, ароматные компоты, густые кисели, горячий сбитень и домашний квас. Готовьте как в старину!"
        keywords="напитки, морс, компот, кисель, сбитень, квас, русские напитки, традиционные напитки"
        url="https://russka-kuhnya-9551.vercel.app/category/drinks"
      />
      
      {/* 🍞 ХЛЕБНЫЕ КРОШКИ БЕЗ ПРОПССОВ — в списке! */}
      <Breadcrumbs />

      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🍺 Напитки</h1>
        <p className="category-description">
          Традиционные русские напитки: от кваса и сбитня до настоек и наливок
        </p>
      </div>

      <div className="recipes-grid">
        {drinksData.map((recipe) => (
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
                <div className="no-image">🍺</div>
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

export default DrinksCategory;