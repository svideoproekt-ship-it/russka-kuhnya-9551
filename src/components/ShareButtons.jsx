import React, { useState } from 'react';

const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  // Формируем абсолютный URL
  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲 ${shareUrl}`;

  // Функция копирования без надоедливого alert
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать ссылку', err);
      // Fallback для очень старых браузеров
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Функция для нативного меню "Поделиться" (Viber, Почта, SMS и т.д.)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: title || 'Русская Кухня', 
          text: `Посмотри рецепт "${title}"!`, 
          url: shareUrl 
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Если пользователь отменил или произошла ошибка, просто копируем
          handleCopy();
        }
      }
    } else {
      // На ПК, где navigator.share не работает, просто копируем ссылку
      handleCopy();
    }
  };

  // Общий стиль для кнопок
  const btnStyle = (bgColor) => ({
    padding: '10px 14px',
    fontSize: '14px',
    color: 'white',
    background: bgColor,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'transform 0.2s, opacity 0.2s',
    fontWeight: '600',
    textDecoration: 'none',
    fontFamily: 'inherit',
  });

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      justifyContent: 'center', 
      margin: '15px 0',
      flexWrap: 'wrap' 
    }}>
      {/* Telegram */}
      <a 
        href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank" 
        rel="noopener noreferrer"
        style={btnStyle('#24A1DE')}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        ✈️ TG
      </a>

      {/* WhatsApp */}
      <a 
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
        target="_blank" 
        rel="noopener noreferrer"
        style={btnStyle('#25D366')}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        💬 WA
      </a>

      {/* VK */}
      <a 
        href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
        target="_blank" 
        rel="noopener noreferrer"
        style={btnStyle('#0077FF')}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        🔵 VK
      </a>

      {/* Копировать ссылку */}
      <button 
        onClick={handleCopy}
        style={btnStyle(copied ? '#4CAF50' : '#607D8B')} // Серый цвет, зелёный при успехе
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Скопировать ссылку"
      >
        {copied ? '✅' : '📋'}
      </button>

      {/* ЕЩЁ (Нативное меню устройства: Почта, Viber, SMS и т.д.) */}
      <button 
        onClick={handleNativeShare}
        style={btnStyle('#FF9800')}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Поделиться через другие приложения"
      >
        📤 Ещё
      </button>
    </div>
  );
};

export default ShareButtons;