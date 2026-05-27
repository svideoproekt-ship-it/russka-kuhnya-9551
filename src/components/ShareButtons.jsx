import React from 'react';

const ShareButtons = ({ title }) => {
  const currentUrl = window.location.href;
  const shareText = `Посмотри рецепт "${title}" в Русской Кухне! 🍲`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Рецепт',
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Ошибка шаринга:', err);
      }
    } else {
      // Фолбэк для ПК: копируем ссылку
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert('✅ Ссылка на рецепт скопирована!');
      } catch (err) {
        console.error('Не удалось скопировать', err);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
      <button
        onClick={handleShare}
        style={{
          padding: '14px 32px',
          fontSize: '18px',
          background: 'linear-gradient(135deg, #ff9800, #f57c00)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        📤 Поделиться рецептом
      </button>
    </div>
  );
};

export default ShareButtons;