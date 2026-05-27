import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { soupsData } from '../data/soupsData';
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  // === КОНСОЛЬНЫЕ ЛОГИ (для отладки) ===
  console.log('=== RecipePage ===');
  console.log('ID из URL:', id);
  console.log('ID как число:', parseInt(id));
  
  // Ищем рецепт по числовому id
  const recipe = soupsData.find(r => {
    console.log(`Сравниваем: ${r.id} === ${parseInt(id)} ? ${r.id === parseInt(id)}`);
    return r.id === parseInt(id);
  });
  
  console.log('Найденный рецепт:', recipe);
  console.log('Ингредиенты:', recipe?.ingredients);

  // === ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЦВЕТОВ КАТЕГОРИИ ===
  const getCategoryTheme = () => {
    const category = recipe?.category?.toLowerCase() || '';
    
    // СУПЫ (Бирюзовый градиент)
    if (category.includes('суп') || category.includes('щи') || category.includes('борщ')) {
      return { bg: '#00BFFF', end: '#008080', pageBg: '#001f3f' };
    }
    // МЯСО (Красный градиент)
    if (category.includes('мясн') || category.includes('мясо') || category.includes('беф')) {
      return { bg: '#d32f2f', end: '#8b0000', pageBg: '#1a0505' };
    }
    // ВЫПЕЧКА (Оранжевый градиент)
    if (category.includes('выпечк') || category.includes('блин') || category.includes('пирог')) {
      return { bg: '#ff9800', end: '#f57c00', pageBg: '#1a1000' };
    }
    // РЫБА (Синий градиент)
    if (category.includes('рыб') || category.includes('рыба')) {
      return { bg: '#1976d2', end: '#0d47a1', pageBg: '#001020' };
    }
    // ДЕСЕРТЫ (Розовый градиент)
    if (category.includes('десерт') || category.includes('сладк')) {
      return { bg: '#e91e63', end: '#880e4f', pageBg: '#1a0010' };
    }
    
    // По умолчанию (Серый)
    return { bg: '#607d8b', end: '#37474f', pageBg: '#101518' };
  };

  const theme = getCategoryTheme();

  // Если рецепт не найден
  if (!recipe) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', background: theme.pageBg }}>
        <h1 style={{ color: '#fff' }}>😔 Рецепт не найден</h1>
        <p style={{ color: '#ccc' }}>ID: {id}</p>
        <Link to="/category/soups" style={{ color: theme.bg, textDecoration: 'none', fontWeight: 'bold' }}>
          ← Вернуться к супам
        </Link>
      </div>
    );
  }

  // === ОСНОВНОЙ РЕНДЕР ===
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
        
        {/* Кнопка "Назад" */}
        <Link to="/category/soups" className="back-link">← Назад к списку</Link>
        
        {/* Заголовок рецепта */}
        <div className="recipe-header">
          <h1>{recipe.name}</h1>
          <div className="recipe-meta">
            {recipe.epoch && <span className="meta-item">🏛 {recipe.epoch}</span>}
            {recipe.time && <span className="meta-item">⏱ {recipe.time}</span>}
          </div>
        </div>

        {/* Кнопка "Поделиться" */}
        <ShareButtons title={recipe.name} />
        
        {/* Картинка */}
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="recipe-image"
            onError={(e) => {
              console.log('Ошибка загрузки изображения');
              e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото';
            }}
          />
        )}

        {/* Ингредиенты */}
        <div className="recipe-section">
          <h2>📝 Ингредиенты</h2>
          <ul>
            {recipe.ingredients && recipe.ingredients.map((item, index) => (
              <li key={index}>
                {typeof item === 'string' 
                  ? item 
                  : `${item.name} — ${item.amount} ${item.unit}`
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Приготовление */}
        <div className="recipe-section">
          <h2>👨‍🍳 Приготовление</h2>
          <ol>
            {recipe.preparation && recipe.preparation.map((step, index) => (
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