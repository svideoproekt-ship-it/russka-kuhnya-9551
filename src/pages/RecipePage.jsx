import React, { useEffect } from 'react';  // ← Добавили useEffect
import { useParams, Link } from 'react-router-dom';
import allRecipes from '../data/recipes';
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  const recipe = allRecipes.find(r => {
    if (r.id === id) return true;
    const urlNum = parseInt(id);
    const recipeIdMatch = String(r.id).match(/\d+/);
    if (recipeIdMatch && parseInt(recipeIdMatch[0]) === urlNum) return true;
    return false;
  });

  // === ВСТАВКА SCHEMA.ORG В <head> НАДЁЖНЫМ СПОСОБОМ ===
  useEffect(() => {
    if (!recipe) return;
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": recipe.title || recipe.name,
      "description": `Традиционный рецепт: ${recipe.title || recipe.name}`,
      "image": recipe.image ? [recipe.image] : [],
      "author": { "@type": "Organization", "name": "Русская Кухня" },
      "datePublished": "2024-01-01",
      "prepTime": "PT30M",
      "cookTime": "PT1H30M",
      "totalTime": "PT2H",
      "recipeYield": "6 порций",
      "recipeCategory": recipe.category === 'soups' ? 'Суп' : 'Блюдо',
      "recipeCuisine": "Русская",
      "keywords": `${recipe.title || recipe.name}, рецепт, русская кухня`,
      "recipeIngredient": (recipe.ingredients || []).map(item => 
        typeof item === 'string' ? item : `${item.name} — ${item.amount} ${item.unit}`
      ),
      "recipeInstructions": (recipe.preparation || []).map(step => ({
        "@type": "HowToStep",
        "text": step
      }))
    };

    // Создаём и вставляем скрипт в <head>
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Очистка при уходе со страницы
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [recipe]);  // ← Пересоздаём при смене рецепта

  // ... остальной код компонента (без изменений) ...
  
  if (!recipe) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>😔 Рецепт не найден</h1>
        <Link to="/">← На главную</Link>
      </div>
    );
  }

  const getCategoryTheme = () => {
    // ... твой код цветов ...
    return { bg: '#607d8b', end: '#37474f', pageBg: '#1E3A5F' };
  };

  const theme = getCategoryTheme();

  return (
    <div className="recipe-page" style={{ '--cat-start': theme.bg, '--cat-end': theme.end, '--page-bg': theme.pageBg }}>
      {/* ... твой код рецепта без изменений ... */}
      <div className="recipe-container">
        <Link to="/" className="back-link">← На главную</Link>
        <div className="recipe-header">
          <h1>{recipe.title || recipe.name}</h1>
          <ShareButtons title={recipe.title || recipe.name} />
        </div>
        {/* ... ингредиенты, приготовление, история ... */}
      </div>
    </div>
  );
};

export default RecipePage;