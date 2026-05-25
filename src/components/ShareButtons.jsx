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

  // Стили для контейнера
  const containerStyle = {
    marginTop: '30px',
    padding: '20px',
    background: '#fff8e1',
    borderRadius: '12px',
    border: '2px solid #ffca28',
    textAlign: 'center'
  };

  // Стили для кнопок
  const buttonStyle = {
    display: 'inline-block',
    padding: '12px 20px',
    margin: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    minWidth: '100px'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#d32f2f' }}>
        Поделись рецептом с друзьями! 👇
      </h3>
      
      <div>
        <button onClick={handleNativeShare} style={{ ...buttonStyle, background: '#ff9800' }}>
          📱 Поделиться
        </button>

        <a href={vkLink} target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, background: '#0077FF' }}>
          ВКонтакте
        </a>

        <a href={tgLink} target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, background: '#0088cc' }}>
          Telegram
        </a>

        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, background: '#25D366' }}>
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;