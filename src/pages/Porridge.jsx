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
            url={`https://russka-kuhnya-9551.vercel.app/recipe/${selectedRecipe.id}`}
          image={selectedRecipe.image ? `https://russka-kuhnya-9551.vercel.app${selectedRecipe.image}` : undefined}
/>
          
          {/* 🍞 ХЛЕБНЫЕ КРОШКИ С ПРОПСАМИ */}
          <Breadcrumbs 
            recipeTitle={selectedRecipe.name}
            categoryName="Каши"
            categoryPath="/category/porridge"
          />

          <div className="recipe-detail">
            <button 
  onClick={() => window.location.href = '/category/porridge'}
  className="back-button"
  style={{ 
    position: 'relative', 
    zIndex: 1000,
    cursor: 'pointer',
    pointerEvents: 'auto'
  }}
>
  ← Вернуться к кашам
</button>
            
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
                    alt={`${selectedRecipe.name} — традиционная русская каша, пошаговый рецепт с фото`}
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

  {/* 📚 ИСТОРИЧЕСКАЯ СПРАВКА */}
  {selectedRecipe.history && (
    <div className="recipe-section history-section">
      <h2>📚 Историческая справка</h2>
      <p className="history-text">{selectedRecipe.history}</p>
    </div>
  )}

  {/* 🍽️ ДРУГИЕ РЕЦЕПТЫ */}
  <div className="recipe-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '3px solid #FFD700' }}>
    <h2 style={{ color: '#8B0000', fontSize: '1.8rem', marginBottom: '20px' }}>🍽️ Другие рецепты</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
      {(() => {
        const otherRecipes = porridgeData.filter(r => r.id !== selectedRecipe.id);
        const shuffled = otherRecipes.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        return shuffled.map(recipe => (
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
                alt={`${recipe.name} — русская каша, рецепт с фото`}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <h4 style={{ color: '#8B0000', fontSize: '1rem', margin: '8px 0 4px 0', lineHeight: '1.3' }}>{recipe.name}</h4>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>⏱ {recipe.time}</span>
          </div>
        ));
      })()}
    </div>
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
                  alt={`${recipe.name} — русская каша, рецепт с фото`}
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