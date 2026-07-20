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
import { porridgeData } from '../data/porridgeData';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    const allRecipes = [
      ...(soupsData || []).map(r => ({ ...r, categoryName: 'Супы' })),
      ...(bakingData || []).map(r => ({ ...r, categoryName: 'Выпечка' })),
      ...(meatData || []).map(r => ({ ...r, categoryName: 'Мясо' })),
      ...(fishData || []).map(r => ({ ...r, categoryName: 'Рыба' })),
      ...(snacksData || []).map(r => ({ ...r, categoryName: 'Закуски' })),
      ...(dessertsData || []).map(r => ({ ...r, categoryName: 'Десерты' })),
      ...(drinksData || []).map(r => ({ ...r, categoryName: 'Напитки' })),
      ...(doughData || []).map(r => ({ ...r, categoryName: 'Тесто' })),
      ...(porridgeData || []).map(r => ({ ...r, categoryName: 'Каши' })),
    ];

    const filtered = allRecipes.filter(recipe => {
      const recipeName = (recipe.title || recipe.name || '').toLowerCase();
      const matchesName = recipeName.includes(searchTerm);

      const matchesIngredient = recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.some(ing => {
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
        description={query ? `Результаты поиска по запросу "${query}". Найдено рецептов: ${results.length}.` : 'Поиск по всем рецептам русской кухни.'}
        keywords="поиск рецептов, найти рецепт, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/search"
      />
      
      <Breadcrumbs />

      <div className="search-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🔍 Поиск рецептов</h1>
        {query && <p className="search-query">Результаты для: "{query}"</p>}
      </div>

      <div className="search-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {results.length === 0 && query && (
          <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            <p style={{ fontSize: '1.2rem' }}>😕 Ничего не найдено</p>
            <p>Попробуйте другой запрос (например: "щи", "капуста", "говядина")</p>
          </div>
        )}

        {!query && (
          <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            <p style={{ fontSize: '1.2rem' }}>🔍 Введите поисковый запрос</p>
            <p>Например: "борщ", "пельмени", "медовик"</p>
          </div>
        )}

        {results.map((recipe) => {
          // 🔥 Формируем правильный URL картинки
          const recipeImage = recipe.image 
            ? (recipe.image.startsWith('http') ? recipe.image : `https://russka-kuhnya-9551.vercel.app${recipe.image}`)
            : 'https://via.placeholder.com/300x180?text=Русская+Кухня';

          return (
            <Link 
              key={`${recipe.categoryName}-${recipe.id}`} 
              to={`/recipe/${recipe.id}`} // 🔥 ИСПРАВЛЕНО: прямой переход на /recipe/{id}
              className="search-result-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              {/* 🔥 БЛОК С КАРТИНКОЙ И ИДЕАЛЬНЫМИ СТИЛЯМИ */}
              <div style={{ width: '100%', height: '180px', overflow: 'hidden', background: '#f0f0f0' }}>
                <img 
                  src={recipeImage}
                  alt={recipe.title || recipe.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // 🔥 ГЛАВНОЕ ИСПРАВЛЕНИЕ: обрезает, не искажая пропорции
                    display: 'block'
                  }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x180?text=Нет+фото'; }}
                />
              </div>
              
              <div style={{ padding: '15px' }}>
                <div style={{ fontSize: '0.85rem', color: '#8B0000', fontWeight: 'bold', marginBottom: '5px', textTransform: 'uppercase' }}>
                  {recipe.categoryName}
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2c1810', lineHeight: '1.3' }}>
                  {recipe.title || recipe.name || 'Без названия'}
                </h3>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#666' }}>
                  <span>🕰 {recipe.epoch || 'Традиционное'}</span>
                  <span>⏱ {recipe.time || 'Не указано'}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;