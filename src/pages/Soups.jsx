import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { soupsData } from '../data/soupsData';
import './Soups.css';

const Soups = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  
  const allSoups = [...soupsData, ...modernSoups];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipe');
    
    if (recipeId) {
      const recipe = allSoups.find(r => String(r.id) === String(recipeId));
      if (recipe) {
        setSelectedRecipe(recipe);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [allSoups]);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (recipe) => {
  // 🔥 ИСПРАВЛЕНО: ведём на отдельную страницу рецепта, а не ?recipe=...
  const shareUrl = `https://russka-kuhnya-9551.vercel.app/recipe/${recipe.id}`;
  
  if (navigator.share) {
    navigator.share({
      title: recipe.name || recipe.title,
      text: (recipe.history || recipe.description || '').substring(0, 150) + '...',
      url: shareUrl,
    }).catch(() => console.log('Отменено'));
  } else {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('✅ Ссылка скопирована!'))
      .catch(() => alert('❌ Ошибка'));
  }
};

  // 🔥 ДЕТАЛЬНЫЙ ПРОСМОТР РЕЦЕПТА
  if (selectedRecipe) {
    // Вычисляем правильный абсолютный URL картинки для соцсетей
    const rawImage = selectedRecipe.image;
    const seoImage = rawImage 
      ? (rawImage.startsWith('http') ? rawImage : `https://russka-kuhnya-9551.vercel.app${rawImage}`)
      : 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg';

    const recipeName = selectedRecipe.name || selectedRecipe.title || 'Рецепт';

    return (
      <>
        <SEO 
          title={`${recipeName} — Рецепт с фото | Русская Кухня`}
          description={selectedRecipe.history?.substring(0, 150) || recipeName}
          keywords="супы, русская кухня, рецепты"
          url={`https://russka-kuhnya-9551.vercel.app/recipe/${selectedRecipe.id}`}
          image={seoImage} 
        />
        
        <Breadcrumbs 
          recipeTitle={recipeName}
          categoryName="Супы"  
          categoryPath="/soups"
        />

        <div className="recipe-detail">
          <button onClick={handleBack} className="back-button">← Вернуться к списку</button>
          
          <div className="recipe-card">
            <div className="recipe-header">
              <h1>{recipeName}</h1>
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
                  alt={`${recipeName} — традиционный русский суп`}
                  className="recipe-image"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото'; }}
                />
              </div>
            )}

            <div className="recipe-content">
              <div className="recipe-section">
                <h2>📝 Ингредиенты</h2>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((item, index) => (
                    <li key={index}>{typeof item === 'string' ? item : `${item.name} ${item.amount} ${item.unit}`}</li>
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
            </div> {/* Закрывает recipe-content */}
          </div> {/* Закрывает recipe-card */}
        </div> {/* Закрывает recipe-detail */}
      </>  
    );
  }

  // 🔥 СПИСОК ВСЕХ СУПОВ
  return (
    <div className="soups-category">
      <SEO 
        title="Супы - Традиционные русские рецепты | Русская Кухня"
        description="Лучшие рецепты русских супов: щи, борщ, солянка, уха и другие традиционные блюда."
        keywords="супы, русские супы, щи, борщ, солянка, рецепты супов"
        url="https://russka-kuhnya-9551.vercel.app/soups"
      />
      <Breadcrumbs />
      
      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🍲 Супы</h1>
        <p className="category-description">
          Традиционные русские супы — от древних щей до современных крем-супов
        </p>
      </div>

      <div className="recipes-grid">
        {allSoups.map((recipe) => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe)}
            style={{ cursor: 'pointer' }}
          >
            <div className="recipe-card-image">
              {recipe.image ? (
                <img 
                  loading="lazy"
                  src={recipe.image} 
                  alt={`${recipe.name || recipe.title} — русский суп`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото'; }}
                />
              ) : (
                <div className="no-image">{recipe.icon || '🍲'}</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name || recipe.title}</h3>
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
};

export default Soups;