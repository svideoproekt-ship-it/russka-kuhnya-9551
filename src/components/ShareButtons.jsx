import React from 'react';

const ShareButtons = ({ title }) => {
  const currentUrl = window.location.href;
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
    <div style={{ marginTop: '40px', marginBottom: '20px', padding: '20px', background: '#fff8e1', borderRadius: '12px', textAlign: 'center', border: '2px solid #ffca28' }}>
      <h3 style={{ marginBottom: '15px', color: '#d32f2f' }}>Понравился рецепт? Поделись с друзьями! 👇</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        
        {/* Кнопка для телефона (самая важная для PWA) */}
        <button 
          onClick={handleNativeShare}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', background: '#ff9800', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
        >
          📱 Поделиться
        </button>

        {/* ВКонтакте */}
        <a href={vkLink} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', fontSize: '16px', background: '#0077FF', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
          🔵 ВКонтакте
        </a>

        {/* Telegram */}
        <a href={tgLink} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', fontSize: '16px', background: '#0088cc', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
          🔵 Telegram
        </a>

        {/* WhatsApp */}
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', fontSize: '16px', background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
          🟢 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;