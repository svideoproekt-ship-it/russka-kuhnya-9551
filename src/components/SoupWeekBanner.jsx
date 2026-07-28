import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SoupWeekBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // 🔥 Автоматически генерируем ключ на основе заголовка баннера
  const bannerTitle = "СЕГОДНЯ: ВЕСЕННИЙ СУП С ФРИКАДЕЛЬКАМИ"; // ← МЕНЯЙ ЭТОТ ТЕКСТ при смене баннера
  // 🔥 Безопасное создание ключа без btoa (работает с русским текстом)
const bannerKey = 'soupWeekBanner_' + bannerTitle.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, '').slice(0, 20);

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
      background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 50%, #CDDC39 100%)',
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

      {/* Главный заголовок */}
      <h2 style={{
        color: '#fff',
        fontSize: '2rem',
        textAlign: 'center',
        margin: '0 0 15px 0',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
      }}>
        НЕДЕЛЯ СУПОВ!
      </h2>

      {/* День недели */}
      <p style={{
  color: '#fff',
  fontSize: '0.85rem',
  textAlign: 'center',
  margin: '0 0 10px 0',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px'
}}>
  День седьмой (Финал!)
</p>

      {/* Заголовок */}
      <h3 style={{
        color: '#FFD700',
        fontSize: '1.4rem',
        textAlign: 'center',
        margin: '0 0 20px 0',
        fontWeight: 'bold'
      }}>
        {bannerTitle}
      </h3>

      {/* Список преимуществ */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 25px 0',
        textAlign: 'center'
      }}>
          {[
    '🟢 Свежий зелёный горошек',
    '✨ Готовится всего 30 минут',
    '🍡 Нежные домашние фрикадельки',
    '🌿 Лёгкий и полезный'
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

      {/* Иконка */}
      <div style={{ fontSize: '50px', textAlign: 'center', marginTop: '20px' }}>
        🍲
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