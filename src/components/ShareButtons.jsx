import React, { useState, useRef, useEffect } from 'react';

const ShareButtons = ({ title, url }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // Определяем мобильное устройство по userAgent
  useEffect(() => {
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shareUrl = url?.startsWith('http') 
    ? url 
    : `${window.location.origin}${url || window.location.pathname}`;
  
  const shareText = `Посмотри рецепт "${title}" на сайте Русская Кухня! 🍲`;

  // Обработчик кнопки "Поделиться"
  const handleShare = () => {
    if (isMobile && navigator.share) {
      // На мобильных используем нативное меню
      navigator.share({ 
        title: title || 'Русская Кухня', 
        text: shareText, 
        url: shareUrl 
      }).catch(err => {
        if (err.name !== 'AbortError') {
          setShowMenu(true);
        }
      });
    } else {
      // На ПК показываем кастомное меню
      setShowMenu(!showMenu);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('✅ Ссылка скопирована!');
      setShowMenu(false);
    } catch (err) {
      console.error('Не удалось скопировать:', err);
    }
  };

  const btnStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    color: 'white',
    background: '#ff9800',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontFamily: 'inherit',
    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)'
  };

  const menuItemStyle = (bgColor) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: bgColor,
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'transform 0.2s, opacity 0.2s',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left'
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
      <button 
        onClick={handleShare}
        style={btnStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f57c00';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#ff9800';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        📤 Поделиться
      </button>

      {/* Выпадающее меню (только на ПК) */}
      {showMenu && !isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '12px',
          minWidth: '220px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <a 
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={menuItemStyle('#24A1DE')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ✈️ Telegram
          </a>

          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={menuItemStyle('#25D366')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            💬 WhatsApp
          </a>

          <a 
            href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={menuItemStyle('#0077FF')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔵 ВКонтакте
          </a>

          <a 
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`}
            style={menuItemStyle('#EA4335')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📧 Email
          </a>

          <button 
            onClick={handleCopy}
            style={menuItemStyle('#607D8B')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📋 Копировать ссылку
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;