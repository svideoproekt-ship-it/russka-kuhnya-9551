// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import SubscribeButton from '../components/SubscribeButton';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="home-page">
      {/* Шапка */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🍲</span>
          <h1>Русская Кухня</h1>
        </div>
        <p className="tagline">Традиции, проверенные временем</p>
      </header>

      {/* Поиск */}
      <div className="search-section">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Найти рецепт (например: борщ, пельмени, медовик)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-icon">🔍</button>
        </form>
      </div>

      {/* Категории */}
            {/* Кнопка подписки */}
      <SubscribeButton />

      {/* Категории */}
      <main className="main-content">
        {/* Кухонные хитрости - специальная секция */}
<div className="hacks-promo">
  <a href="/kitchen-hacks" className="hacks-promo-link">
    <div className="hacks-promo-content">
      <div className="hacks-promo-icon">💡</div>
      <div className="hacks-promo-text">
        <h3>Кухонные хитрости</h3>
        <p>Полезные советы для приготовления, хранения и организации кухни</p>
      </div>
      <div className="hacks-promo-arrow">→</div>
    </div>
  </a>
</div>

{/* Категории */}
<main className="main-content">
  <Categories />
</main>
        <Categories />
      </main>

      {/* Подвал */}
      <footer className="footer">
        <p>© 2026 Русская Кухня. Сохраняем традиции.</p>
      </footer>
    </div>
  );
}

export default HomePage;