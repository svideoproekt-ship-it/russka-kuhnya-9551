import React from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    
    if (typeof window.OneSignal !== 'undefined') {
      console.log('✅ OneSignal найден!');
      
      window.OneSignal.push(function() {
        console.log('✅ OneSignal.push вызван');
        
        // Используем метод регистрации для пушей
        window.OneSignal.registerForPushNotifications({
          onSuccess: function() {
            console.log('✅ Подписка успешна!');
            alert('🔔 Отлично! Теперь ты будешь получать уведомления!');
          },
          onFailure: function(error) {
            console.error('❌ Ошибка подписки:', error);
            alert('⚠️ Не удалось подписаться: ' + error);
          }
        });
      });
    } else {
      console.error('❌ OneSignal не найден!');
      alert('⚠️ Сервис уведомлений загружается. Подождите и попробуйте снова.');
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
            <span> Подписаться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;