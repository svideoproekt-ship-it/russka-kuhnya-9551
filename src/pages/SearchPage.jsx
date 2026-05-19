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
    const allRecipes = [
      ...soupsData.map(r => ({ ...r, category: 'Супы', link: '/category/soups' })),
      ...bakingData.map(r => ({ ...r, category: 'Выпечка', link: '/category/baking' })),
      ...meatData.map(r => ({ ...r, category: 'Мясные блюда', link: '/category/meat' })),
      ...fishData.map(r => ({ ...r, category: 'Рыбные блюда', link: '/category/fish' })),
      ...snacksData.map(r => ({ ...r, category: 'Закуски', link: '/category/snacks' })),
      ...dessertsData.map(r => ({ ...r, category: 'Десерты', link: '/category/desserts' })),
      ...drinksData.map(r => ({ ...r, category: 'Напитки', link: '/category/drinks' })),
      ...doughData.map(r => ({ ...r, category: 'Тесто', link: '/category/dough' })),
    ];

    const filtered = allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
    );

    setResults(filtered);
  }, [query]);

  return (
    <div className="search-page">
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
            <div className="result-category">{recipe.category}</div>
            <h3>{recipe.name}</h3>
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