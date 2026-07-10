import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bakingData } from '../data/bakingData';
import './BakingCategory.css';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

function BakingCategory() {
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
      <div className="baking-category">
        <SEO 
          title={`${selectedRecipe.name} — Русская Кухня`}
          description={selectedRecipe.history?.substring(0, 150) || selectedRecipe.name}
          keywords="выпечка, русская кухня"
          url={`https://russka-kuhnya-9551.vercel.app/category/baking?recipe=${selectedRecipe.id}`}
        />
        
        {/* 🍞 ХЛЕБНЫЕ КРОШКИ С ПРОПСАМИ — ВНУТРИ if (selectedRecipe)! */}
        <Breadcrumbs 
          recipeTitle={selectedRecipe.name}
          categoryName="Выпечка"
          categoryPath="/category/baking"
        />
        
        <button 
  onClick={() => window.location.href = '/category/baking'}
  className="back-button"
  style={{ 
    position: 'relative', 
    zIndex: 1000,
    cursor: 'pointer',
    pointerEvents: 'auto'
  }}
>
  ← Вернуться к выпечке
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
              <img loading="lazy" src={selectedRecipe.image} alt={selectedRecipe.name} className="recipe-image" />
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

  // ✅ СПИСОК РЕЦЕПТОВ
  return (
    <div className="baking-category">
      <SEO 
        title="Рецепты выпечки — пироги, блины, пирожки | Русская Кухня"
        description="Традиционные рецепты русской выпечки: пышные пироги, тонкие блины, румяные пирожки. Пошаговые инструкции с фото!"
        keywords="выпечка, пироги, блины, пирожки, медовик, русская выпечка"
        url="https://russka-kuhnya-9551.vercel.app/category/baking"
      />
      
      {/* 🍞 ХЛЕБНЫЕ КРОШКИ БЕЗ ПРОПССОВ — в списке! */}
      <Breadcrumbs />
      
      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🥧 Выпечка</h1>
        <p className="category-description">
          Традиционные рецепты русской выпечки: пышные пироги, тонкие блины, румяные пирожки
        </p>
      </div>
      
      <div className="recipes-grid">
        {bakingData.map((recipe) => (
          <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
            <div className="recipe-card-image">
              <img loading="lazy" src={recipe.image} alt={recipe.name} />
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

export default BakingCategory;