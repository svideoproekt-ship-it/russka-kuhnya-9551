import React from 'react';

const ShareButtons = ({ title }) => {
  const currentUrl = window.location.href;
  const shareText = `Посмотри рецепт "${title}" в приложении Русская Кухня! 🍲`;

  const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: currentUrl });
      } catch (err) {
        console.log('Ошибка шаринга', err);
      }
    }
  };

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      background: '#fff8e1', 
      borderRadius: '12px', 
      border: '2px solid #ffca28',
      width: '100%',
      maxWidth: '600px',
      margin: '30px auto 0',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#d32f2f', textAlign: 'center' }}>
        Понравился рецепт? Поделись с друзьями! 👇
      </h3>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        flexWrap: 'wrap' 
      }}>
        <button 
          onClick={handleNativeShare}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            background: '#ff9800', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold',
            minWidth: '140px'
          }}
        >
          📱 Поделиться
        </button>

        <a href={vkLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          background: '#0077FF', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          🔵 ВКонтакте
        </a>

        <a href={tgLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          background: '#0088cc', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px',
          minWidth: '100px',
          textAlign: 'center'
        }}>
          🔵 Telegram
        </a>

        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          background: '#25D366', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          🟢 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;