import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Проверяем статус подписки при загрузке
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = () => {
    if (typeof window.OneSignal !== 'undefined') {
      window.OneSignal.push(function() {
        window.OneSignal.isPushNotificationsEnabled(function(enabled) {
          setIsSubscribed(enabled);
        });
      });
    }
  };

  const handleSubscribe = () => {
    if (isSubscribed) {
      alert('✅ Вы уже подписаны на уведомления!');
      return;
    }

    setIsLoading(true);

    if (typeof window.OneSignal !== 'undefined') {
      window.OneSignal.push(function() {
        // Показываем нативное окно подписки
        window.OneSignal.registerForPushNotifications({
          onSuccess: function() {
            setIsSubscribed(true);
            setIsLoading(false);
            alert('🔔 Отлично! Теперь вы будете получать уведомления о новых рецептах!');
          },
          onFailure: function(error) {
            console.error('Error subscribing:', error);
            setIsLoading(false);
            alert('⚠️ Не удалось подписаться. Попробуйте позже.');
          }
        });
      });
    } else {
      alert('⚠️ Сервис уведомлений загружается. Попробуйте позже.');
      setIsLoading(false);
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
              {isSubscribed ? 'Вы подписаны ✓' : 'Подпишись на новые рецепты!'}
            </h3>
            <p className="subscribe-description">
              {isSubscribed 
                ? 'Ты будешь первым, кто узнает о новых рецептах' 
                : 'Получай уведомления о новых рецептах русской кухни'}
            </p>
          </div>

          <button 
            className={`subscribe-button ${isSubscribed ? 'subscribed' : ''} ${isLoading ? 'loading' : ''}`}
            onClick={handleSubscribe}
            disabled={isLoading || isSubscribed}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="loading-spinner"></span>
                Подписка...
              </span>
            ) : isSubscribed ? (
              <span>✓ Подписан</span>
            ) : (
              <span>🔔 Подписаться</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;