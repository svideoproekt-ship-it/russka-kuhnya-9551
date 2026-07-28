import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { meatData } from '../data/meatData';
import './MeatCategory.css';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

function MeatCategory() {
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
    const rawImage = selectedRecipe.image;
    const seoImage = rawImage 
      ? (rawImage.startsWith('http') ? rawImage : `https://russka-kuhnya-9551.vercel.app${rawImage}`)
      : 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg';

    return (
      <div className="meat-category">
        <SEO 
          title={`${selectedRecipe.name} — Рецепт с фото | Русская Кухня`}
          description={selectedRecipe.history?.substring(0, 150) || selectedRecipe.name}
          keywords="мясные блюда, русская кухня, рецепты мяса"
          url={`https://russka-kuhnya-9551.vercel.app/recipe/${selectedRecipe.id}`}
          image={seoImage}
        />
        
        {/* 🍞 ХЛЕБНЫЕ КРОШКИ */}
        <Breadcrumbs 
          recipeTitle={selectedRecipe.name}
          categoryName="Мясные блюда"
          categoryPath="/category/meat"
        />
        
        <button onClick={handleBack} className="back-button">
          ← Вернуться к списку
        </button>
        
        <div className="recipe-detail">
          <div className="recipe-header">
            <ShareButtons title={selectedRecipe.name} />
            <h1>{selectedRecipe.name}</h1>
            <div className="recipe-meta">
              <span className="epoch">🕰 {selectedRecipe.epoch}</span>
              <span className="time">⏱ {selectedRecipe.time}</span>
              {selectedRecipe.servings && <span className="servings">🍽 {selectedRecipe.servings} порций</span>} {/* 🔥 ПОРЦИИ */}
            </div>
          </div>

          {selectedRecipe.image && (
            <div className="recipe-image-container">
              <img 
                loading="lazy"
                src={selectedRecipe.image} 
                alt={`${selectedRecipe.name} — традиционное русское мясное блюдо`}
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
                  // 🔥 ИСПРАВЛЕНО: корректный вывод объекта или строки
                  <li key={index}>
                    {typeof item === 'string' ? item : `${item.name} — ${item.amount} ${item.unit}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h2>👨‍🍳 Приготовление</h2>
              <ol className="preparation-list">
                {/* 🔥 ИСПРАВЛЕНО: preparation заменено на steps */}
                {(selectedRecipe.steps || selectedRecipe.preparation || []).map((step, index) => (
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

            {/* 🔥 ДОБАВЛЯЕМ БЛОК ЧАСТЫХ ВОПРОСОВ (FAQ) */}
            {selectedRecipe.faq && selectedRecipe.faq.length > 0 && (
              <div className="recipe-section faq-section">
                <h2>❓ Частые вопросы</h2>
                {selectedRecipe.faq.map((item, index) => (
                  <div key={index} className="faq-item" style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                    <h3 style={{ color: '#8B0000', fontSize: '1.1rem', marginBottom: '8px' }}>❓ {item.question}</h3>
                    <p style={{ color: '#333', lineHeight: '1.6', paddingLeft: '10px', borderLeft: '3px solid #FFD700' }}>{item.answer}</p>
                  </div>
                ))}
              </div>
            )}

            
            {/* 🍽️ ДРУГИЕ РЕЦЕПТЫ */}
            <div className="recipe-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '3px solid #FFD700' }}>
              <h2 style={{ color: '#8B0000', fontSize: '1.8rem', marginBottom: '20px' }}>🍽️ Другие рецепты</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {meatData
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
                          alt={recipe.name}
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <h4 style={{ color: '#8B0000', fontSize: '1rem', margin: '8px 0 4px 0', lineHeight: '1.3' }}>{recipe.name}</h4>
                      <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span>⏱ {recipe.time}</span>
                        {recipe.servings && <span>🍽 {recipe.servings} порц.</span>} {/* 🔥 ПОРЦИИ В БЛОКЕ ДРУГИХ РЕЦЕПТОВ */}
                      </div>
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
    <div className="meat-category">
      <SEO 
        title="Мясные блюда — котлеты, гуляш, жаркое | Русская Кухня"
        description="Лучшие рецепты мясных блюд русской кухни: сочные котлеты, ароматный гуляш, нежное жаркое. Пошаговые инструкции с фото!"
        keywords="мясные блюда, котлеты, гуляш, жаркое, бефстроганов, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/category/meat"
      />
      
      {/* 🍞 ХЛЕБНЫЕ КРОШКИ */}
      <Breadcrumbs />

      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🥩 Мясные блюда</h1>
        <p className="category-description">
          Сочное, ароматное, сытное — мясо по-русски! От классики до экзотики
        </p>
      </div>

      <div className="recipes-grid">
        {meatData.map((recipe) => (
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
                  alt={`${recipe.name} — русское мясное блюдо`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото'; }}
                />
              ) : (
                <div className="no-image">🥩</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span>⏱ {recipe.time}</span>
                {recipe.servings && <span>🍽️ {recipe.servings} порц.</span>} {/* 🔥 ПОРЦИИ В СПИСКЕ */}
              </div>
              <button className="view-recipe-btn">Смотреть рецепт</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeatCategory;