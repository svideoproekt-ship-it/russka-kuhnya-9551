// src/pages/HomePage.jsx
import FeedbackForm from '../components/FeedbackForm';
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
{/* Блюда сезона - специальная секция */}
<div className="seasonal-promo">
  <a href="/seasonal-dishes" className="seasonal-promo-link">
    <div className="seasonal-promo-content">
      <div className="seasonal-promo-icon">☀️</div>
      <div className="seasonal-promo-text">
        <h3>Блюда сезона</h3>
        <p>Летние рецепты из свежих овощей, фруктов и ягод</p>
      </div>
      <div className="seasonal-promo-arrow">→</div>
    </div>
  </a>
</div>
{/* Вкусы мира - специальная секция */}
<div className="world-promo">
  <a href="/world-cuisines" className="world-promo-link">
    <div className="world-promo-content">
      <div className="world-promo-icon">🌍</div>
      <div className="world-promo-text">
        <h3>Вкусы мира</h3>
        <p>Народные рецепты из разных стран. Новый рецепт каждую неделю!</p>
      </div>
      <div className="world-promo-arrow">→</div>
    </div>
  </a>
</div>
  {/* Категории */}
  <Categories />
</main>

      <footer className="footer">
  <FeedbackForm />
  <p>© 2026 Русская Кухня. Сохраняем традиции.</p>
</footer>
    </div>
  );
}

export default HomePage;