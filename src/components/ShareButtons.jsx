// src/components/ShareButtons.jsx
import React from 'react';

const ShareButtons = ({ title, url, compact = false }) => {
  // Гарантируем абсолютный URL
  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲`;

  // Ссылки для соцсетей (упрощённый формат)
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
  const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

  // Нативный шеринг (работает на мобильных и в современных браузерах)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') console.log('Ошибка шеринга:', err);
      }
    } else {
      // Фолбэк: копируем ссылку в буфер
      navigator.clipboard.writeText(shareUrl);
      alert('Ссылка скопирована в буфер обмена! 📋');
    }
  };

  const btnStyle = {
    padding: compact ? '8px 14px' : '12px 20px',
    fontSize: compact ? '14px' : '16px',
    background: '#0088cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background 0.2s'
  };

  return (
    <div style={{ display: 'flex', gap: compact ? '8px' : '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      
      {/* Кнопка "Поделиться" (универсальная) */}
      <button 
        onClick={handleNativeShare}
        style={{ ...btnStyle, background: '#ff9800' }}
        onMouseOver={e => e.target.style.background = '#f57c00'}
        onMouseOut={e => e.target.style.background = '#ff9800'}
      >
        📤 Поделиться
      </button>

      {/* Telegram */}
      <a 
        href={tgLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#0088cc' }}
        onMouseOver={e => e.target.style.background = '#0077b5'}
        onMouseOut={e => e.target.style.background = '#0088cc'}
      >
        ✈ Telegram
      </a>

      {/* ВКонтакте */}
      <a 
        href={vkLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#4a76a8' }}
        onMouseOver={e => e.target.style.background = '#3d6699'}
        onMouseOut={e => e.target.style.background = '#4a76a8'}
      >
        💙 ВКонтакте
      </a>

      {/* WhatsApp */}
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#25d366' }}
        onMouseOver={e => e.target.style.background = '#12b75a'}
        onMouseOut={e => e.target.style.background = '#25d366'}
      >
        💚 WhatsApp
      </a>
    </div>
  );
};

export default ShareButtons;