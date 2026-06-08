import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    console.log('✅ SubscribeButton загружен!');
    console.log('OneSignalDeferred:', typeof window.OneSignalDeferred);
    console.log('OneSignal:', typeof window.OneSignal);
  }, []);

  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    
    // Проверяем старую версию OneSignal
    if (window.OneSignal) {
      console.log('Используем старую версию OneSignal');
      window.OneSignal.push(function() {
        window.OneSignal.registerForPushNotifications({
          onSuccess: function() {
            console.log('✅ Подписка успешна!');
            setIsSubscribed(true);
          },
          onFailure: function(error) {
            console.error('❌ Ошибка подписки:', error);
          }
        });
      });
      return;
    }
    
    // Проверяем новую версию OneSignal
    if (window.OneSignalDeferred) {
      console.log('Используем новую версию OneSignal');
      window.OneSignalDeferred.push(async function(OneSignal) {
        try {
          await OneSignal.showSlidedownPrompt();
          console.log('✅ Показан слайд-даун');
        } catch (error) {
          console.error('❌ Ошибка:', error);
        }
      });
      return;
    }
    
    // Если ничего не работает
    console.error('❌ OneSignal не найден!');
    alert('⚠️ Сервис уведомлений не загружен. Попробуйте позже.');
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