import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [oneSignalReady, setOneSignalReady] = useState(false);

  useEffect(() => {
    // Проверяем загрузился ли OneSignal
    const checkOneSignal = setInterval(() => {
      if (typeof window.OneSignal !== 'undefined') {
        setOneSignalReady(true);
        clearInterval(checkOneSignal);
      }
    }, 500);

    return () => clearInterval(checkOneSignal);
  }, []);

  const handleSubscribe = () => {
    console.log('Клик по кнопке!');
    
    if (!oneSignalReady) {
      alert('⚠️ Сервис уведомлений загружается... Подождите несколько секунд и попробуйте снова.');
      return;
    }

    try {
      window.OneSignal.push(function() {
        console.log('OneSignal.push вызван');
        
        // Пробуем разные методы
        if (window.OneSignal.showNativePrompt) {
          console.log('Используем showNativePrompt');
          window.OneSignal.showNativePrompt();
        } else if (window.OneSignal.showSlidedownPrompt) {
          console.log('Используем showSlidedownPrompt');
          window.OneSignal.showSlidedownPrompt();
        } else if (window.OneSignal.registerForPushNotifications) {
          console.log('Используем registerForPushNotifications');
          window.OneSignal.registerForPushNotifications();
        } else {
          console.log('Показываем колокольчик');
          // Если ничего не работает - просто покажем что OneSignal есть
          alert('✅ OneSignal загружен! Нажмите на колокольчик в правом нижнем углу чтобы подписаться.');
        }
      });
    } catch (error) {
      console.error('Ошибка при подписке:', error);
      alert('❌ Ошибка: ' + error.message);
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
            disabled={!oneSignalReady}
            style={{
              opacity: oneSignalReady ? 1 : 0.6,
              cursor: oneSignalReady ? 'pointer' : 'not-allowed'
            }}
          >
            <span>
              {oneSignalReady ? '🔔 Подписаться' : '⏳ Загрузка...'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;