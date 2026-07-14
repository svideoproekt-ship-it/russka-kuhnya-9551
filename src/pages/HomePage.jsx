// src/pages/HomePage.jsx
import FeedbackForm from '../components/FeedbackForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import SubscribeButton from '../components/SubscribeButton';
import './HomePage.css';
import SEO from '../components/SEO';

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
      {/* SEO - ИСПРАВЛЕНО: теперь внутри return */}
      <SEO 
  title="Русская Кухня — Традиционные рецепты с душой | Щи, борщ, пельмени"
  description="Лучшие рецепты русской кухни с пошаговыми фото: щи, борщ, пельмени, блины. Готовьте как в старину! Кухонные хитрости, блюда сезона, рецепты мира."
  keywords="русская кухня, рецепты, щи, борщ, пельмени, блины, традиционные блюда"
  url="https://russka-kuhnya-9551.vercel.app"
/>

      {/* Шапка */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🍲</span>
          <h1>Русская Кухня</h1>
        </div>
        <p className="tagline">Традиции, проверенные временем</p>
      </header>

            {/* Поиск */}
      <div className="search-section" style={{ padding: '0 20px', marginBottom: '30px' }}>
        <form 
          className="search-container" 
          onSubmit={handleSearch}
          style={{ 
            display: 'flex', 
            gap: '10px', 
            width: '100%', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}
        >
          <input
            type="search" // 🔥 ВАЖНО: открывает клавиатуру с кнопкой "Поиск/Go" на мобильных
            className="search-input"
            placeholder="Найти рецепт (например: борщ, пельмени)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              fontSize: '16px', // 🔥 ВАЖНО: предотвращает зум на iPhone
              outline: 'none',
              background: '#fff'
            }}
            onFocus={(e) => e.target.style.borderColor = '#8B0000'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          
          <button 
            type="submit" 
            className="search-icon"
            onClick={handleSearch} // 🔥 ДВОЙНАЯ ЗАЩИТА: сработает и как submit, и как клик
            style={{
              background: 'linear-gradient(135deg, #8B0000, #A52A2A)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 18px',
              cursor: 'pointer',
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '55px', // 🔥 ВАЖНО: минимальный размер для удобного тапа пальцем
              minHeight: '55px',
              boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)',
              touchAction: 'manipulation', // 🔥 ВАЖНО: убирает задержку 300мс на мобильных
              WebkitTapHighlightColor: 'transparent',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔍
          </button>
        </form>
      </div>

      {/* Кнопка подписки */}
      <SubscribeButton />

      {/* Основной контент */}
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
  <div style={{ 
    marginTop: '20px', 
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  }}>
    <a href="/about" style={{ color: '#A8E6CF', textDecoration: 'none' }}>О проекте</a>
    <a href="/contacts" style={{ color: '#A8E6CF', textDecoration: 'none' }}>Контакты</a>
    <a href="/privacy" style={{ color: '#A8E6CF', textDecoration: 'none' }}>Политика конфиденциальности</a>
  </div>
  <p>© 2026 Русская Кухня. Сохраняем традиции.</p>
</footer>
    </div>
  );
}

export default HomePage;