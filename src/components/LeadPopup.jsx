import React, { useState, useEffect } from 'react';

const LeadPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Проверяем, закрывал ли пользователь попап раньше (храним 30 дней)
    const lastClosed = localStorage.getItem('leadPopupClosed');
    if (lastClosed) {
      const daysSince = (Date.now() - parseInt(lastClosed)) / (1000 * 60 * 60 * 24);
      if (daysSince < 30) {
        setIsClosed(true);
        return;
      }
    }

    const timer = setTimeout(() => {
  setIsVisible(true);
}, 3000); // 🔥 3 секунды вместо 15
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('leadPopupClosed', Date.now().toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Здесь будет отправка на сервер/рассылку
      console.log('Email подписки:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('leadPopupClosed', Date.now().toString());
      }, 4000);
    }
  };

  const handleBookmark = () => {
    // Помощь пользователю добавить сайт в закладки
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? ' + D' : 'Ctrl + D';
    alert(`Чтобы добавить "Русскую Кухню" в закладки, нажмите ${shortcut}\n\nТеперь наши рецепты всегда под рукой! 📖`);
    handleClose();
  };

  if (!isVisible || isClosed) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          padding: '40px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.4s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крестик закрытия */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            color: '#999',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '5px',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#333'}
          onMouseOut={(e) => e.currentTarget.style.color = '#999'}
        >
          ×
        </button>

        {!isSubmitted ? (
          <>
            {/* Иконка */}
            <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '20px' }}>
              🧹✨
            </div>

            {/* Заголовок */}
            <h2 style={{
              color: '#8B0000',
              fontSize: '1.8rem',
              textAlign: 'center',
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              Бесплатный сборник от Бабушки!
            </h2>

            {/* Описание */}
            <p style={{
              color: '#555',
              fontSize: '1.05rem',
              textAlign: 'center',
              lineHeight: '1.6',
              margin: '0 0 25px 0'
            }}>
              Подпишитесь на <strong>"Русскую Кухню"</strong> и получите:
            </p>

            {/* Список превью */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 30px 0'
            }}>
              {[
                '📖 Сборник "10 советов по очистке кухни"',
                '🍲 Новые рецепты каждую неделю',
                '📚 Исторические факты о блюдах',
                ' Уведомления о сезонных блюдах'
              ].map((benefit, idx) => (
                <li key={idx} style={{
                  padding: '10px 15px',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #fff8dc 0%, #ffe4b5 100%)',
                  borderRadius: '8px',
                  color: '#4a2c17',
                  fontSize: '0.95rem',
                  borderLeft: '4px solid #FFD700'
                }}>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Форма Email */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш Email для подписки"
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B0000'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 0, 0, 0.3)';
                }}
              >
                📩 Подписаться на "Русскую Кухню"
              </button>
            </form>

            {/* Разделитель */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px 0',
              color: '#999',
              fontSize: '0.9rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
              <span style={{ padding: '0 15px' }}>или</span>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
            </div>

            {/* Кнопка "Добавить в закладки" */}
            <button
              onClick={handleBookmark}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#8B0000',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 215, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
              }}
            >
              🔖 Добавить сайт в закладки
            </button>

            {/* Мелкий текст */}
            <p style={{
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#999',
              margin: '15px 0 0 0'
            }}>
              🔒 Мы не спамим. Только рецепты и полезные советы.
            </p>
          </>
        ) : (
          /* Сообщение об успехе */
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>
              ✅
            </div>
            <h3 style={{
              color: '#8B0000',
              fontSize: '1.8rem',
              margin: '0 0 15px 0'
            }}>
              Добро пожаловать в "Русскую Кухню"!
            </h3>
            <p style={{
              color: '#555',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              {email 
                ? 'Сборник уже летит на вашу почту! Проверьте папку "Входящие".'
                : 'Теперь наши рецепты всегда под рукой!'}
            </p>
            <p style={{
              color: '#8B0000',
              fontSize: '1rem',
              marginTop: '20px',
              fontStyle: 'italic'
            }}>
              "Готовьте с душой, как учила бабушка!" 👵❤️
            </p>
          </div>
        )}
      </div>

      {/* CSS анимации */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LeadPopup;