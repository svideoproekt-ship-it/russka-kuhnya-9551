import React, { useState } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (typeof window.OneSignal !== 'undefined') {
      // Просто вызываем стандартный метод OneSignal
      window.OneSignal.push(function() {
        window.OneSignal.showNativePrompt();
      });
      
      // Через 2 секунды считаем что подписался (OneSignal сам покажет статус)
      setTimeout(() => {
        setIsSubscribed(true);
      }, 2000);
    } else {
      alert('⚠️ Сервис уведомлений ещё загружается. Обновите страницу.');
    }
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
              Подпишись на новые рецепты!
            </h3>
            <p className="subscribe-description">
              Получай уведомления о новых рецептах русской кухни
            </p>
          </div>

          <button 
            className="subscribe-button"
            onClick={handleSubscribe}
          >
            <span>🔔 Подписаться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;