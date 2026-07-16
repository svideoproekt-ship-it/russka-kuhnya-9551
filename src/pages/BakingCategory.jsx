import Breadcrumbs from '../components/Breadcrumbs';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🔥 ДОБАВИЛИ useNavigate
import { bakingData } from '../data/bakingData';
import './BakingCategory.css';
import SEO from '../components/SEO';

function BakingCategory() {
  const navigate = useNavigate(); // 🔥 ИНИЦИАЛИЗИРУЕМ НАВИГАЦИЮ

  // 🔥 ТЕПЕРЬ ЭТА ФУНКЦИЯ РЕАЛЬНО МЕНЯЕТ URL В БРАУЗЕРЕ!
  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  // ✅ СПИСОК РЕЦЕПТОВ (Детальный просмотр теперь полностью на стороне RecipePage.jsx)
  return (
    <div className="baking-category">
      <SEO 
        title="Рецепты выпечки — пироги, блины, пирожки | Русская Кухня"
        description="Традиционные рецепты русской выпечки: пышные пироги, тонкие блины, румяные пирожки. Пошаговые инструкции с фото!"
        keywords="выпечка, пироги, блины, пирожки, медовик, русская выпечка"
        url="https://russka-kuhnya-9551.vercel.app/category/baking"
      />
      
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
          <div 
            key={recipe.id} 
            className="recipe-card" 
            onClick={() => handleRecipeClick(recipe)} // 🔥 ВЫЗЫВАЕМ ПЕРЕХОД
            style={{ cursor: 'pointer' }} // 🔥 КУРСОР-ПАЛЬЧИК
          >
            <div className="recipe-card-image">
              <img 
                loading="lazy" 
                src={recipe.image}
                alt={`${recipe.name} — русская выпечка, рецепт с фото`} // 🔥 ИСПРАВИЛИ "суп" на "выпечка"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото'; }}
              />
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