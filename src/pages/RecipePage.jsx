import React from 'react';
import { useParams, Link } from 'react-router-dom';
import allRecipes from '../data/recipes';  // ← ИМПОРТИРУЕМ ВСЕ РЕЦЕПТЫ
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  // Ищем рецепт по ID (работает и со строками "soup-1", и с числами)
  const recipe = allRecipes.find(r => {
    // Прямое совпадение
    if (r.id === id) return true;
    
    // Если в URL число (1), а в данных "soup-1" — извлекаем число
    const urlNum = parseInt(id);
    const recipeIdMatch = String(r.id).match(/\d+/);
    if (recipeIdMatch && parseInt(recipeIdMatch[0]) === urlNum) return true;
    
    return false;
  });

  // Функция для получения цветов категории
  const getCategoryTheme = () => {
    const category = recipe?.category?.toLowerCase() || '';
    
    // СУПЫ (Светло-синий градиент)
    if (category === 'soups') {
      return { bg: '#00BFFF', end: '#008080', pageBg: '#1E3A5F' };
    }
    // МЯСО (Тёплый красно-коричневый)
    if (category === 'meat') {
      return { bg: '#d32f2f', end: '#8b0000', pageBg: '#4A1C1C' };
    }
    // ВЫПЕЧКА (Тёплый оранжевый)
    if (category === 'baking') {
      return { bg: '#ff9800', end: '#f57c00', pageBg: '#4A3C1A' };
    }
    // РЫБА (Светло-синий)
    if (category === 'fish') {
      return { bg: '#1976d2', end: '#0d47a1', pageBg: '#1A3A5C' };
    }
    // ЗАКУСКИ (Зелёный)
    if (category === 'snacks') {
      return { bg: '#4caf50', end: '#2e7d32', pageBg: '#1C3C1C' };
    }
    // ДЕСЕРТЫ (Розовый)
    if (category === 'desserts') {
      return { bg: '#e91e63', end: '#880e4f', pageBg: '#4A1A3C' };
    }
    // НАПИТКИ (Фиолетовый)
    if (category === 'drinks') {
      return { bg: '#9c27b0', end: '#6a1b9a', pageBg: '#2E1C3C' };
    }
    // ТЕСТО (Коричневый)
    if (category === 'dough') {
      return { bg: '#8d6e63', end: '#5d4037', pageBg: '#3C2E1C' };
    }
    
    // По умолчанию (Синий)
    return { bg: '#607d8b', end: '#37474f', pageBg: '#1E3A5F' };
  };

  const theme = getCategoryTheme();

  if (!recipe) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', background: theme.pageBg }}>
        <h1 style={{ color: '#fff' }}>😔 Рецепт не найден</h1>
        <p style={{ color: '#ccc' }}>ID: {id}</p>
        <Link to="/" style={{ color: theme.bg, textDecoration: 'none', fontWeight: 'bold' }}>
          ← На главную
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="recipe-page" 
      style={{ 
        '--cat-start': theme.bg, 
        '--cat-end': theme.end,
        '--page-bg': theme.pageBg 
      }}
    >
      <div className="recipe-container">
        <Link to="/" className="back-link">← На главную</Link>
        
        <div className="recipe-header">
          <h1>{recipe.title}</h1>  {/* ← ИСПОЛЬЗУЕМ title ВМЕСТО name */}
          <div className="recipe-meta">
            {recipe.epoch && <span className="meta-item">🏛 {recipe.epoch}</span>}
            {recipe.time && <span className="meta-item">⏱ {recipe.time}</span>}
          </div>
        </div>

        <ShareButtons title={recipe.title} />
        
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="recipe-image"
          />
        )}

        {/* Ингредиенты */}
        <div className="recipe-section">
          <h2>📝 Ингредиенты</h2>
          <ul>
            {(recipe.ingredients || []).map((item, index) => (
              <li key={index}>
                {typeof item === 'string' 
                  ? item 
                  : `${item.name} — ${item.amount} ${item.unit}`
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Приготовление — ИСПОЛЬЗУЕМ steps ВМЕСТО preparation */}
        <div className="recipe-section">
          <h2>👨‍🍳 Приготовление</h2>
          <ol>
            {(recipe.steps || []).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Историческая справка */}
        {recipe.history && (
          <div className="recipe-section history-section">
            <h2>📚 Историческая справка</h2>
            <p>{recipe.history}</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default RecipePage;