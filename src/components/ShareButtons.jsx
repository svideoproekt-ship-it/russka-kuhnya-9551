// src/components/ShareButtons.jsx
import React from 'react';

const ShareButtons = ({ title, url, compact = false }) => {
  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲`;

  // Ссылки для соцсетей (приоритет: РФ-платформы)
  const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
  const okLink = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(shareUrl)}&st.comments=${encodeURIComponent(title)}`;
  const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  // Нативный шеринг (универсальный)
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

  const btnStyle = {
    padding: compact ? '8px 14px' : '12px 20px',
    fontSize: compact ? '14px' : '16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background 0.2s',
    fontWeight: '500'
  };

  return (
    <div style={{ display: 'flex', gap: compact ? '8px' : '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      
      {/* 🔹 Основная кнопка — универсальная */}
      <button 
        onClick={handleNativeShare}
        style={{ ...btnStyle, background: '#ff9800' }}
        onMouseOver={e => e.target.style.background = '#f57c00'}
        onMouseOut={e => e.target.style.background = '#ff9800'}
        title="Поделиться или скопировать ссылку"
      >
        📤 Поделиться
      </button>

      {/* 🔹 ВКонтакте (основная для РФ) */}
      <a 
        href={vkLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#4a76a8' }}
        onMouseOver={e => e.target.style.background = '#3d6699'}
        onMouseOut={e => e.target.style.background = '#4a76a8'}
        title="Поделиться ВКонтакте"
      >
        💙 ВКонтакте
      </a>

      {/* 🔹 Одноклассники */}
      <a 
        href={okLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#ee8208' }}
        onMouseOver={e => e.target.style.background = '#d47307'}
        onMouseOut={e => e.target.style.background = '#ee8208'}
        title="Поделиться в Одноклассниках"
      >
        🧡 Одноклассники
      </a>

      {/* 🔹 WhatsApp */}
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#25d366' }}
        onMouseOver={e => e.target.style.background = '#12b75a'}
        onMouseOut={e => e.target.style.background = '#25d366'}
        title="Поделиться в WhatsApp"
      >
        💚 WhatsApp
      </a>

      {/* 🔹 Телеграм (опционально, для тех у кого работает) */}
      <a 
        href={tgLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#0088cc', opacity: 0.85 }}
        onMouseOver={e => e.target.style.background = '#0077b5'}
        onMouseOut={e => e.target.style.background = '#0088cc'}
        title="Поделиться в Telegram (если доступен)"
      >
        ✈ Телеграм
      </a>
    </div>
  );
};

export default ShareButtons;