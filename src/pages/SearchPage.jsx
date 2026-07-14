// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { soupsData } from '../data/soupsData';
import { bakingData } from '../data/bakingData';
import { meatData } from '../data/meatData';
import { fishData } from '../data/fishData';
import { snacksData } from '../data/snacksData';
import { dessertsData } from '../data/dessertsData';
import { drinksData } from '../data/drinksData';
import { doughData } from '../data/doughData';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get('q') || '';

    useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Собираем все рецепты и добавляем им правильное имя для поиска
    const allRecipes = [
      ...soupsData.map(r => ({ ...r, categoryName: 'Супы', link: '/soups' })),
      ...bakingData.map(r => ({ ...r, categoryName: 'Выпечка', link: '/category/baking' })),
      ...meatData.map(r => ({ ...r, categoryName: 'Мясо', link: '/category/meat' })),
      ...fishData.map(r => ({ ...r, categoryName: 'Рыба', link: '/category/fish' })),
      ...snacksData.map(r => ({ ...r, categoryName: 'Закуски', link: '/category/snacks' })),
      ...dessertsData.map(r => ({ ...r, categoryName: 'Десерты', link: '/category/desserts' })),
      ...drinksData.map(r => ({ ...r, categoryName: 'Напитки', link: '/category/drinks' })),
      ...doughData.map(r => ({ ...r, categoryName: 'Тесто', link: '/category/dough' })),
      ...porridgeData.map(r => ({ ...r, categoryName: 'Каши', link: '/category/porridge' })), // <-- Не забудь добавить каши, если они есть!
    ];

    const filtered = allRecipes.filter(recipe => {
      // 🔥 БЕЗОПАСНОЕ ПОЛУЧЕНИЕ НАЗВАНИЯ (title ИЛИ name)
      const recipeName = (recipe.title || recipe.name || '').toLowerCase();
      const matchesName = recipeName.includes(searchTerm);

      // 🔥 БЕЗОПАСНАЯ ПРОВЕРКА ИНГРЕДИЕНТОВ
      const matchesIngredient = recipe.ingredients && recipe.ingredients.some(ing => {
        const ingText = typeof ing === 'string' ? ing : (ing.name || '');
        return ingText.toLowerCase().includes(searchTerm);
      });

      return matchesName || matchesIngredient;
    });

    setResults(filtered);
  }, [query]);
  

  return (
    <div className="search-page">
      <SEO 
        title={query ? `Поиск: ${query} — Русская Кухня` : 'Поиск рецептов — Русская Кухня'}
        description={query ? `Результаты поиска по запросу "${query}". Найдено рецептов: ${results.length}.` : 'Поиск по всем рецептам русской кухни. Найдите любимое блюдо быстро!'}
        keywords="поиск рецептов, найти рецепт, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/search"
      />
      
      <Breadcrumbs />

      <div className="search-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🔍 Поиск рецептов</h1>
        {query && <p className="search-query">Результаты для: "{query}"</p>}
      </div>

      <div className="search-results">
        {results.length === 0 && query && (
          <div className="no-results">
            <p>😕 Ничего не найдено</p>
            <p>Попробуйте другой запрос</p>
          </div>
        )}

        {!query && (
          <div className="no-results">
            <p>🔍 Введите поисковый запрос</p>
            <p>Например: "борщ", "пельмени", "медовик"</p>
          </div>
        )}

        {results.map((recipe) => (
          <Link 
            key={`${recipe.category}-${recipe.id}`} 
            to={`${recipe.link}?recipe=${recipe.id}`}
            className="search-result-card"
          >
                        <div className="result-category">{recipe.categoryName}</div>
            <h3>{recipe.title || recipe.name}</h3>
            <div className="result-meta">
              <span>🕰 {recipe.epoch}</span>
              <span>⏱ {recipe.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;