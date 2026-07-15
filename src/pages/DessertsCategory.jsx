import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dessertsData } from '../data/dessertsData';
import './DessertsCategory.css';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

function DessertsCategory() {
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
      <div className="desserts-category">
  <SEO 
  title={`${selectedRecipe.name} — Рецепт с фото | Русская Кухня`}
  description={selectedRecipe.history?.substring(0, 150) || selectedRecipe.name}
  keywords="десерты, русская кухня, рецепты"
  // 🔥 ИСПРАВЛЕНО: ведёт на отдельную страницу рецепта
  url={`https://russka-kuhnya-9551.vercel.app/recipe/${selectedRecipe.id}`}
  image={selectedRecipe.image ? `https://russka-kuhnya-9551.vercel.app${selectedRecipe.image}` : undefined}
/>
        
        {/* 🍞 ХЛЕБНЫЕ КРОШКИ С ПРОПСАМИ — ВНУТРИ if (selectedRecipe)! */}
        <Breadcrumbs 
          recipeTitle={selectedRecipe.name}
          categoryName="Десерты"
          categoryPath="/category/desserts"
        />
        
       <button 
  onClick={() => window.location.href = '/category/drinks'}
  className="back-button"
  style={{ 
    position: 'relative', 
    zIndex: 1000,
    cursor: 'pointer',
    pointerEvents: 'auto'
  }}
>
  ← Вернуться к напиткам
</button>
        
        <div className="recipe-detail">
          <div className="recipe-header">
            <h1>{selectedRecipe.name}</h1>
            <div className="recipe-meta">
              <span className="epoch"> {selectedRecipe.epoch}</span>
              <span className="time">⏱ {selectedRecipe.time}</span>
            </div>
          </div>

          <ShareButtons title={selectedRecipe.name} />
          {selectedRecipe.image && (
            <div className="recipe-image-container">
              <img 
                loading="lazy"
                src={selectedRecipe.image} 
                alt={`${selectedRecipe.name} — традиционный русский десерт, пошаговый рецепт с фото`}
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
    {/* ️ ДРУГИЕ РЕЦЕПТЫ */}
<div className="recipe-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '3px solid #FFD700' }}>
  <h2 style={{ color: '#8B0000', fontSize: '1.8rem', marginBottom: '20px' }}>🍽️ Другие рецепты</h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
    {dessertsData
      .filter(r => r.id !== selectedRecipe.id)
      .slice(0, 4)
      .map(recipe => (
        <div 
          key={recipe.id} 
          onClick={() => handleRecipeClick(recipe)}
          style={{ 
            background: 'linear-gradient(135deg, #FFF8DC, #FFE4B5)', 
            borderRadius: '12px', 
            padding: '12px', 
            cursor: 'pointer',
            border: '2px solid #FFD700',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textAlign: 'center'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {recipe.image && (
            <img 
              loading="lazy"
              src={recipe.image} 
              alt={`${recipe.name} — русский десерт, рецепт с фото`}
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <h4 style={{ color: '#8B0000', fontSize: '1rem', margin: '8px 0 4px 0', lineHeight: '1.3' }}>{recipe.name}</h4>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>⏱ {recipe.time}</span>
        </div>
      ))
    }
  </div>
</div>      
          </div>
        </div>
      </div>
    );
  }
  
  // ✅ СПИСОК РЕЦЕПТОВ
  return (
    <div className="desserts-category">
      <SEO 
        title="Десерты — медовик, тирамису, шарлотка | Русская Кухня"
        description="Традиционные рецепты десертов: знаменитый медовик, нежный тирамису, ароматная шарлотка. Пошаговые инструкции с фото!"
        keywords="десерты, медовик, тирамису, шарлотка, торты, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/category/desserts"
      />
      
      {/* 🍞 ХЛЕБНЫЕ КРОШКИ БЕЗ ПРОПССОВ — в списке! */}
      <Breadcrumbs />

      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🍰 Десерты</h1>
        <p className="category-description">
          Традиционные рецепты десертов: знаменитый медовик, нежный тирамису, ароматная шарлотка
        </p>
      </div>

      <div className="recipes-grid">
        {dessertsData.map((recipe) => (
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
                  alt={`${recipe.name} — русский десерт, рецепт с фото`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото';
                  }}
                />
              ) : (
                <div className="no-image">🍰</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span> {recipe.time}</span>
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

export default DessertsCategory;