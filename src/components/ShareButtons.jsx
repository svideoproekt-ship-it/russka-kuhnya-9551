import React from 'react';

const ShareButtons = ({ title, url }) => {
  // Формируем абсолютный URL
  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲`;

  // Кнопка "Поделиться" (использует нативное меню браузера/телефона)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch (err) {
        if (err.name !== 'AbortError') {
           navigator.clipboard.writeText(shareUrl);
          alert('📋 Ссылка скопирована в буфер!');
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('📋 Ссылка скопирована в буфер!');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '6px', 
      justifyContent: 'center', 
      margin: '10px 0'
    }}>
      <button 
        onClick={handleNativeShare}
        style={{
          padding: '12px 16px',
          fontSize: '14px',
          color: 'white',
          background: '#ff9800',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          transition: 'transform 0.2s, background 0.2s',
          fontWeight: '600',
          fontFamily: 'inherit',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f57c00';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#ff9800';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        📤 Поделиться
      </button>
    </div>
  );
};

export default ShareButtons;