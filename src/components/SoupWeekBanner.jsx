import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SoupWeekBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Проверяем, закрывал ли пользователь баннер
  useEffect(() => {
    const closed = localStorage.getItem('soupWeekBannerClosed');
    if (closed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('soupWeekBannerClosed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 50%, #DC143C 100%)',
      borderRadius: '15px',
      padding: '30px',
      margin: '20px auto',
      maxWidth: '900px',
      boxShadow: '0 8px 25px rgba(255, 69, 0, 0.4)',
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
          fontSize: '24px',
          color: '#fff',
          cursor: 'pointer',
          opacity: 0.8,
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
        onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
      >
        ×
      </button>

      {/* Иконка */}
      <div style={{ fontSize: '50px', textAlign: 'center', marginBottom: '15px' }}>
        🍲
      </div>

      {/* Заголовок */}
      <h2 style={{
        color: '#fff',
        fontSize: '2rem',
        textAlign: 'center',
        margin: '0 0 15px 0',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        НЕДЕЛЯ СУПОВ!
      </h2>

      {/* Описание */}
<h3 style={{
  color: '#FFD700',
  fontSize: '1.3rem',
  textAlign: 'center',
  margin: '0 0 20px 0',
  fontWeight: 'bold'
}}>
  СЕГОДНЯ: СУП-ПЮРЕ ИЗ СВЕКОЛЬНОЙ БОТВЫ
</h3>

<ul style={{
  listStyle: 'none',
  padding: 0,
  margin: '0 0 25px 0',
  textAlign: 'center'
}}>
  {[
    '🍲 Нежный суп-пюре',
    '🌿 Из свекольной ботвы',
    '✨ Готовится за 40 минут',
    '💚 Полезно и вкусно'
  ].map((item, index) => (
    <li key={index} style={{
      color: '#fff',
      fontSize: '1.05rem',
      margin: '6px 0',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    }}>
      {item}
    </li>
  ))}
</ul>

      {/* Кнопка */}
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/soups"
          style={{
            display: 'inline-block',
            padding: '14px 30px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#8B0000',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
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
          👉 Смотреть все супы
        </Link>
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

export default SoupWeekBanner;