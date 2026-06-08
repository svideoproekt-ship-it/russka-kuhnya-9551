import React from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    
    if (typeof window.OneSignal !== 'undefined') {
      console.log('✅ OneSignal найден!');
      
      // Показываем слайд-даун подсказку (работает надёжнее)
      window.OneSignal.push(function() {
        console.log('✅ Вызываем showSlidedownPrompt');
        
        // Пробуем показать слайд-даун
        try {
          window.OneSignal.showSlidedownPrompt();
          console.log('✅ showSlidedownPrompt вызван');
        } catch (error) {
          console.error('❌ Ошибка showSlidedownPrompt:', error);
          
          // Если не сработало - пробуем registerForPushNotifications
          window.OneSignal.registerForPushNotifications(function(permission) {
            console.log('Разрешение:', permission);
            if (permission === 'granted') {
              alert('🔔 Отлично! Ты подписан!');
            }
          });
        }
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