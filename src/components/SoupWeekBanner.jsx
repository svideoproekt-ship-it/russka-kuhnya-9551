import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewRecipeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // 🔥 Заголовок баннера (меняй его при смене новинки)
  const bannerTitle = "НАСТОЙКА НА ЧЕРЁМУХЕ: СВЕЖАЯ И СУШЁНАЯ"; 
  
  // 🔥 Безопасное создание ключа для localStorage
  const bannerKey = 'newRecipeBanner_' + bannerTitle.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, '').slice(0, 20);

  useEffect(() => {
    const closed = localStorage.getItem(bannerKey);
    if (closed) {
      setIsVisible(false);
    }
  }, [bannerKey]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(bannerKey, Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'relative',
      // 🔥 Благородный бордово-винный градиент, идеально подходящий для темы настоек
      background: 'linear-gradient(135deg, #581018 0%, #8B0000 50%, #A52A2A 100%)',
      borderRadius: '15px',
      padding: '30px',
      margin: '20px auto',
      maxWidth: '900px',
      boxShadow: '0 8px 25px rgba(139, 0, 0, 0.4)',
      border: '3px solid #FFD700',
      animation: 'slideIn 0.5s ease'
    }}>
      {/* Кнопка закрытия */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          background: 'none',
          border: 'none',
          fontSize: '28px',
          color: '#fff',
          cursor: 'pointer',
          opacity: 0.8,
          transition: 'opacity 0.2s',
          lineHeight: '1'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
        onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
        aria-label="Закрыть баннер"
      >
        ×
      </button>

      {/* Главный заголовок */}
      <h2 style={{
        color: '#FFD700',
        fontSize: '2.2rem',
        textAlign: 'center',
        margin: '0 0 10px 0',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        letterSpacing: '1px'
      }}>
        🌟 НОВИНКА НА САЙТЕ! 🌟
      </h2>

      {/* Подзаголовок */}
      <p style={{
        color: '#fff',
        fontSize: '0.9rem',
        textAlign: 'center',
        margin: '0 0 15px 0',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        opacity: 0.9
      }}>
        Специальный выпуск: Традиционные рецепты
      </p>

      {/* Название рецепта */}
      <h3 style={{
        color: '#fff',
        fontSize: '1.5rem',
        textAlign: 'center',
        margin: '0 0 25px 0',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
      }}>
        {bannerTitle}
      </h3>

      {/* Список преимуществ */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 30px 0',
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px 30px'
      }}>
        {[
          '🍒 Уникальный миндально-пряный аромат',
          '🏺 Два проверенных временем рецепта',
          '⏳ Идеально для зимних вечеров и лета',
          '🌿 По старинным русским традициям'
        ].map((item, index) => (
          <li key={index} style={{
            color: '#fff',
            fontSize: '1.1rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {item}
          </li>
        ))}
      </ul>

      {/* Кнопка */}
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/category/drinks"
          style={{
            display: 'inline-block',
            padding: '14px 35px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#581018',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '1.15rem',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 215, 0, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)';
          }}
        >
          👉 Смотреть рецепты настоек
        </Link>
      </div>

      {/* Иконка */}
      <div style={{ fontSize: '60px', textAlign: 'center', marginTop: '25px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
        🍒🏺
      </div>

      {/* CSS анимация */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NewRecipeBanner;