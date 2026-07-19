import Breadcrumbs from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { porridgeData } from '../data/porridgeData';
import ShareButtons from '../components/ShareButtons';
import './Porridge.css';

const Porridge = () => {
  const navigate = useNavigate();

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/porridge-${recipe.id}`);
  };

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
            style={{ cursor: 'pointer' }}
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