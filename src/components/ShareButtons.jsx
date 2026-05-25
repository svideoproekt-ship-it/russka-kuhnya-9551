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
      marginTop: '20px', 
      padding: '15px', 
      background: '#fff8e1', 
      borderRadius: '8px', 
      border: '1px solid #ffca28',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#d32f2f', textAlign: 'center' }}>
        Поделись рецептом! 👇
      </h3>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        flexWrap: 'wrap' 
      }}>
        <button 
          onClick={handleNativeShare}
          style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', background: '#ff9800', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
        >
          📱
        </button>

        <a href={vkLink} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', fontSize: '14px', background: '#0077FF', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          ВК
        </a>

        <a href={tgLink} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', fontSize: '14px', background: '#0088cc', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          TG
        </a>

        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', fontSize: '14px', background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          WA
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;