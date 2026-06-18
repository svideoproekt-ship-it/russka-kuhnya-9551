import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { soupsData } from '../data/soupsData';
import './Soups.css';

const Soups = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Если рецепт выбран - показываем детали
  if (selectedRecipe) {
    return (
      <div className="soup-page">
        <SEO 
          title={`${selectedRecipe.name} - Рецепт с историей | Русская Кухня`}
          description={`${selectedRecipe.name}. Время: ${selectedRecipe.time}. Эпоха: ${selectedRecipe.epoch}. ${selectedRecipe.history}`}
          keywords={`${selectedRecipe.name}, рецепт, русская кухня, ${selectedRecipe.epoch}`}
          url={`https://russka-kuhnya-9551.vercel.app/soups?id=${selectedRecipe.id}`}
        />

        <div className="soup-detail">
          <button className="back-button" onClick={handleBack}>
            ← Назад к списку
          </button>
          
          <div className="recipe-card">
            <div className="recipe-header">
              <h1>{selectedRecipe.name}</h1>
              <div className="recipe-meta">
                <span className="epoch">🕰 {selectedRecipe.epoch}</span>
                <span className="time">⏱ {selectedRecipe.time}</span>
              </div>
            </div>

            {selectedRecipe.image && (
              <div className="recipe-image-container">
                <img 
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

              <div className="recipe-section history-section">
                <h2>📚 Историческая справка</h2>
                <p className="history-text">{selectedRecipe.history}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Список всех супов
  return (
    <div className="soup-page">
      <SEO 
        title="Самые популярные супы - 15 рецептов с историей | Русская Кухня"
        description="15 традиционных рецептов супов русской кухни: щи, борщ, солянка, рассольник, уха. Пошаговые рецепты с историей каждого блюда!"
        keywords="супы рецепты, щи, борщ, солянка, рассольник, уха, окрошка, русская кухня, традиционные супы"
        url="https://russka-kuhnya-9551.vercel.app/soups"
      />

      {/* Шапка */}
      <header className="soups-header">
        <div className="soups-header-content">
          <span className="soups-header-icon">🍲</span>
          <h1>Самые популярные супы</h1>
          <p>15 традиционных рецептов с пошаговыми инструкциями</p>
          <p className="soups-subtitle">📖 С историей каждого блюда</p>
        </div>
      </header>

      {/* Счётчик */}
      <div className="soups-counter">
        Всего рецептов: <strong>{soupsData.length}</strong>
      </div>

      {/* Сетка рецептов */}
      <div className="soups-grid">
        {soupsData.map((soup) => (
          <div 
            key={soup.id} 
            className="soup-card"
            onClick={() => handleRecipeClick(soup)}
          >
            <div className="soup-card-header">
              <span className="soup-icon">🍲</span>
              <span className="soup-category-badge">{soup.epoch.split(' - ')[0]}</span>
            </div>
            
            <div className="soup-card-body">
              <h3>{soup.name}</h3>
              <p className="soup-description">{soup.history.substring(0, 100)}...</p>
              
              <div className="soup-meta-inline">
                <span>⏱ {soup.time}</span>
              </div>
            </div>

            <div className="soup-card-footer">
              <button className="read-more-btn">
                Смотреть рецепт →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Подвал */}
      <footer className="soups-footer">
        <p>🍲 Приятного аппетита! Готовьте с любовью и делитесь с близкими!</p>
        <Link to="/" className="soups-back-link">← Вернуться на главную</Link>
      </footer>
    </div>
  );
};

export default Soups;