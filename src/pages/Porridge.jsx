import Breadcrumbs from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { porridgeData } from '../data/porridgeData';
import './Porridge.css';

const Porridge = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipe');
    
    if (recipeId) {
      const recipe = porridgeData.find(r => r.id === parseInt(recipeId));
      if (recipe) {
        setSelectedRecipe(recipe);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [porridgeData]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (recipe) => {
    const shareUrl = `https://russka-kuhnya-9551.vercel.app/category/porridge?recipe=${recipe.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: recipe.description?.substring(0, 150) || '',
        url: shareUrl,
      }).catch(() => console.log('Отменено'));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('✅ Ссылка скопирована!'))
        .catch(() => alert('❌ Ошибка'));
    }
  };

  // ✅ ДЕТАЛЬНЫЙ ПРОСМОТР РЕЦЕПТА
  if (selectedRecipe) {
    return (
      <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": selectedRecipe.name,
              "image": selectedRecipe.image ? 
                `https://russka-kuhnya-9551.vercel.app${selectedRecipe.image}` : 
                'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg',
              "description": selectedRecipe.description || '',
              "prepTime": selectedRecipe.time || 'PT30M',
              "recipeIngredient": selectedRecipe.ingredients || [],
              "recipeInstructions": (selectedRecipe.preparation || []).map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "text": step
              })),
              "author": {
                "@type": "Organization",
                "name": "Русская Кухня"
              }
            })}
          </script>
        </Helmet>
        
        <div className="porridge-category">
          <SEO 
            title={`${selectedRecipe.name} — Русская Кухня`}
            description={selectedRecipe.description || ''}
            keywords="каши, русская кухня"
            url={`https://russka-kuhnya-9551.vercel.app/category/porridge?recipe=${selectedRecipe.id}`}
          />
          
          {/* 🍞 ХЛЕБНЫЕ КРОШКИ С ПРОПСАМИ */}
          <Breadcrumbs 
            recipeTitle={selectedRecipe.name}
            categoryName="Каши"
            categoryPath="/category/porridge"
          />

          <div className="recipe-detail">
            <Link to="/category/porridge" className="back-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
  ← Вернуться к кашам
</Link>
            
            <div className="recipe-card">
              <div className="recipe-header">
                <h1>{selectedRecipe.name}</h1>
                <div className="recipe-meta">
                  <span className="epoch">🕰 {selectedRecipe.epoch}</span>
                  <span className="time">⏱ {selectedRecipe.time}</span>
                </div>
              </div>

              <div className="recipe-top-actions">
                <button className="share-btn-top" onClick={() => handleShare(selectedRecipe)}>
                  <span>📤</span> Поделиться рецептом
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ✅ СПИСОК ВСЕХ КАШ
  return (
    <div className="porridge-category">
      <SEO 
        title="Каши — гречка, овсянка, рис, пшёнка | Русская Кухня"
        description="Лучшие рецепты русских каш: рассыпчатая гречка, нежная овсянка, ароматный рис. Пошаговые инструкции с фото!"
        keywords="каши, гречка, овсянка, рис, пшёнка, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/category/porridge"
      />
      
      {/* 🍞 ХЛЕБНЫЕ КРОШКИ БЕЗ ПРОПССОВ */}
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
};

export default Porridge;