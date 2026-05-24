import React from 'react';

// Добавь url в пропсы 👇
const ShareButtons = ({ title, url, compact = false }) => {
  // Если url не передан, используем текущий
  const currentUrl = url || window.location.href;
  const shareText = `Посмотри рецепт "${title}" в приложении Русская Кухня! 🍲`;

  // Ссылки для соцсетей
  const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;

  // Функция для нативного "Поделиться" (открывает меню телефона)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Ошибка шаринга', err);
      }
    }
  };

  return (
    <div style={{ 
      marginTop: '40px', 
      marginBottom: '20px', 
      padding: '20px', 
      background: '#fff8e1', 
      borderRadius: '8px' 
    }}>
      <h3 style={{ marginBottom: '15px', color: '#d32f2f' }}>Понравился рецепт? Поделись с друзьями!</h3>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Кнопка для телефона (самая важная для PWA) */}
        <button
          onClick={handleNativeShare}
          style={{ 
            padding: compact ? '8px 16px' : '12px 24px', 
            fontSize: compact ? '14px' : '16px', 
            cursor: 'pointer', 
            background: '#ff9800', 
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          📤 Поделиться
        </button>

        {/* ВКонтакте */}
        <a href={vkLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: compact ? '8px 16px' : '12px 24px', 
          fontSize: compact ? '14px' : '16px',
          background: '#4a76a8',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          🔵 ВКонтакте
        </a>

        {/* Telegram */}
        <a href={tgLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: compact ? '8px 16px' : '12px 24px', 
          fontSize: compact ? '14px' : '16px',
          background: '#0088cc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          🔵 Telegram
        </a>

        {/* WhatsApp */}
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: compact ? '8px 16px' : '12px 24px', 
          fontSize: compact ? '14px' : '16px',
          background: '#25d366',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          🟢 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;