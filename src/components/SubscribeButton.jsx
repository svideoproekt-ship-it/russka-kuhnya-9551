import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [oneSignalReady, setOneSignalReady] = useState(false);

  useEffect(() => {
    // Проверяем загрузился ли OneSignal
    const checkOneSignal = setInterval(() => {
      if (typeof window.OneSignal !== 'undefined') {
        setOneSignalReady(true);
        
        // Проверяем статус подписки
        window.OneSignal.push(function() {
          window.OneSignal.isPushNotificationsEnabled(function(enabled) {
            setIsSubscribed(enabled);
          });
        });
        
        clearInterval(checkOneSignal);
      }
    }, 500);

    return () => clearInterval(checkOneSignal);
  }, []);

  const handleSubscribe = () => {
    if (!oneSignalReady) {
      alert('⚠️ Сервис уведомлений загружается... Подождите несколько секунд.');
      return;
    }

    // Используем правильный метод OneSignal
    window.OneSignal.push(function() {
      // Показываем слайд-даун (современный метод)
      window.OneSignal.showSlidedownPrompt();
    });
  };

  return (
    <div className="subscribe-section">
      <div className="subscribe-container">
        <div className="subscribe-content">
          <div className="subscribe-icon-wrapper">
            <span className="subscribe-icon">🔔</span>
          </div>
          
          <div className="subscribe-text">
            <h3 className="subscribe-title">
              {isSubscribed ? 'Вы подписаны ✓' : 'Подпишись на новые рецепты!'}
            </h3>
            <p className="subscribe-description">
              {isSubscribed 
                ? 'Ты будешь первым, кто узнает о новых рецептах' 
                : 'Получай уведомления о новых рецептах русской кухни'}
            </p>
          </div>

          <button 
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={!oneSignalReady}
          >
            <span>
              {oneSignalReady 
                ? (isSubscribed ? '✓ Подписан' : '🔔 Подписаться') 
                : '⏳ Загрузка...'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;