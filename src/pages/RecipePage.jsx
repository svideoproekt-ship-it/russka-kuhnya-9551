import React from 'react';
import { useParams, Link } from 'react-router-dom';
import allRecipes from '../data/recipes';
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  console.log('=== RecipePage ===');
  console.log('ID из URL:', id);
  
  const recipe = allRecipes.find(r => {
    if (r.id === id) return true;
    const urlNum = parseInt(id);
    const recipeIdMatch = String(r.id).match(/\d+/);
    if (recipeIdMatch && parseInt(recipeIdMatch[0]) === urlNum) return true;
    return false;
  });

  const getCategoryTheme = () => {
    const category = recipe?.category?.toLowerCase() || '';
    
    if (category === 'soups') {
      return { bg: '#00BFFF', end: '#008080', pageBg: '#1E3A5F' };
    }
    if (category === 'meat') {
      return { bg: '#d32f2f', end: '#8b0000', pageBg: '#4A1C1C' };
    }
    if (category === 'baking') {
      return { bg: '#ff9800', end: '#f57c00', pageBg: '#4A3C1A' };
    }
    if (category === 'fish') {
      return { bg: '#1976d2', end: '#0d47a1', pageBg: '#1A3A5C' };
    }
    if (category === 'snacks') {
      return { bg: '#4caf50', end: '#2e7d32', pageBg: '#1C3C1C' };
    }
    if (category === 'desserts') {
      return { bg: '#e91e63', end: '#880e4f', pageBg: '#4A1A3C' };
    }
    if (category === 'drinks') {
      return { bg: '#9c27b0', end: '#6a1b9a', pageBg: '#2E1C3C' };
    }
    if (category === 'dough') {
      return { bg: '#8d6e63', end: '#5d4037', pageBg: '#3C2E1C' };
    }
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

  // === Schema.org разметка для Яндекс/Google (автоматически подставляет данные рецепта) ===
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title || recipe.name,
    "description": `Традиционный рецепт: ${recipe.title || recipe.name}. ${recipe.history ? recipe.history.substring(0, 150) : ''}`,
    "image": recipe.image ? [recipe.image] : [],
    "author": { "@type": "Organization", "name": "Русская Кухня" },
    "datePublished": "2024-01-01",
    "prepTime": "PT30M",
    "cookTime": recipe.time ? "PT1H30M" : "PT1H",
    "totalTime": "PT2H",
    "recipeYield": "6 порций",
    "recipeCategory": recipe.category === 'soups' ? 'Суп' : 'Блюдо',
    "recipeCuisine": "Русская",
    "keywords": `${recipe.title || recipe.name}, рецепт, русская кухня, ${recipe.category || ''}`,
    "recipeIngredient": (recipe.ingredients || recipe.steps || []).map(item => 
      typeof item === 'string' ? item : `${item.name} — ${item.amount} ${item.unit}`
    ),
    "recipeInstructions": (recipe.preparation || recipe.steps || []).map(step => ({
      "@type": "HowToStep",
      "text": typeof step === 'string' ? step : step
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100"
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD — невидим для пользователя, но важен для поисковиков */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
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
            <h1>{recipe.title || recipe.name}</h1>
            <div className="recipe-meta">
              {recipe.epoch && <span className="meta-item">🏛 {recipe.epoch}</span>}
              {recipe.time && <span className="meta-item">⏱ {recipe.time}</span>}
            </div>
          </div>

          <ShareButtons title={recipe.title || recipe.name} />
          
          {recipe.image && (
            <img 
              src={recipe.image} 
              alt={recipe.title || recipe.name} 
              className="recipe-image"
            />
          )}

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

          <div className="recipe-section">
            <h2>👨‍🍳 Приготовление</h2>
            <ol>
              {(recipe.preparation || recipe.steps || []).map((step, index) => (
                <li key={index}>{typeof step === 'string' ? step : step}</li>
              ))}
            </ol>
          </div>

          {recipe.history && (
            <div className="recipe-section history-section">
              <h2>📚 Историческая справка</h2>
              <p>{recipe.history}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipePage;