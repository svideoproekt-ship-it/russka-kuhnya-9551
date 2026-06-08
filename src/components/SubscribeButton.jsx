import React from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    
    if (typeof window.OneSignal !== 'undefined') {
      console.log('✅ OneSignal найден!');
      
      // Просто вызываем стандартный метод показа колокольчика
      window.OneSignal.push(function() {
        console.log('✅ Показываем колокольчик');
        
        // Показываем уведомление о том что можно подписаться
        window.OneSignal.notifyButton.display(true);
        
        // И через секунду кликаем на него программно
        setTimeout(() => {
          const bellButton = document.querySelector('.onesignal-bell-container');
          if (bellButton) {
            console.log('✅ Кликаем на колокольчик');
            bellButton.click();
          }
        }, 500);
      });
    } else {
      alert('⚠️ Сервис уведомлений загружается. Подождите несколько секунд.');
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