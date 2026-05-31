// src/components/ShareButtons.jsx
import React, { useState, useEffect } from 'react';

const ShareButtons = ({ title, url, compact = false }) => {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Формируем абсолютный URL (чтобы соцсети понимали ссылку)
  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲`;

  // Ссылки для соцсетей
  const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
  const okLink = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(shareUrl)}&st.comments=${encodeURIComponent(title)}`;
  const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  // Универсальная кнопка (Копировать или Меню телефона)
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

  // Стили кнопок
  const btnStyle = {
    padding: compact ? '8px 10px' : '12px 16px',
    fontSize: compact ? '13px' : '14px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    transition: 'transform 0.2s, background 0.2s',
    fontWeight: '600',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap' // Текст не переносится
  };

  // Эффекты при наведении
  const hoverStyle = (e, color) => { 
    e.currentTarget.style.background = color; 
    e.currentTarget.style.transform = 'scale(1.05)'; 
  };
  const leaveStyle = (e, color) => { 
    e.currentTarget.style.background = color; 
    e.currentTarget.style.transform = 'scale(1)'; 
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '6px', 
      justifyContent: 'center', 
      flexWrap: 'wrap',
      margin: '10px 0'
    }}>
      
      {/* 1. Кнопка Поделиться (Основная) */}
      <button 
        onClick={handleNativeShare}
        style={{ ...btnStyle, background: '#ff9800' }}
        onMouseOver={(e) => hoverStyle(e, '#f57c00')}
        onMouseOut={(e) => leaveStyle(e, '#ff9800')}
      >
        📤 Поделиться
      </button>

      {/* 2. ВКонтакте (Всегда видна) */}
      <a 
        href={vkLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ ...btnStyle, background: '#0077FF' }}
        onMouseOver={(e) => hoverStyle(e, '#0066d6')}
        onMouseOut={(e) => leaveStyle(e, '#0077FF')}
      >
        VK
      </a>

      {/* 3. Кнопка "Ещё" (Только для мобильных, если скрыто) */}
      {isMobile && !showMore && (
        <button 
          onClick={() => setShowMore(true)}
          style={{ ...btnStyle, background: '#607d8b' }}
        >
          ⋯ Ещё
        </button>
      )}

      {/* 4. Остальные кнопки (Видны на ПК или если нажали "Ещё") */}
      {(!isMobile || showMore) && (
        <>
          {/* Одноклассники */}
          <a 
            href={okLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ ...btnStyle, background: '#ee8208' }}
            onMouseOver={(e) => hoverStyle(e, '#d67307')}
            onMouseOut={(e) => leaveStyle(e, '#ee8208')}
          >
            OK
          </a>

          {/* WhatsApp */}
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ ...btnStyle, background: '#25d366' }}
            onMouseOver={(e) => hoverStyle(e, '#12b75a')}
            onMouseOut={(e) => leaveStyle(e, '#25d366')}
          >
            WA
          </a>

          {/* Telegram */}
          <a 
            href={tgLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ ...btnStyle, background: '#0088cc' }}
            onMouseOver={(e) => hoverStyle(e, '#0077b5')}
            onMouseOut={(e) => leaveStyle(e, '#0088cc')}
          >
            TG
          </a>
        </>
      )}
    </div>
  );
};

export default ShareButtons;