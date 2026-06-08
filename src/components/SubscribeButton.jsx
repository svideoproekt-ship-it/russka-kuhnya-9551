import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Проверяем статус подписки
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    if (typeof window.OneSignal !== 'undefined') {
      try {
        const subscription = await window.OneSignal.getSubscription();
        setIsSubscribed(subscription);
      } catch (err) {
        console.error('Error checking subscription:', err);
      }
    }
  };

  const handleSubscribe = async () => {
    if (isSubscribed) {
      // Если уже подписан, показываем уведомление
      alert('✅ Вы уже подписаны на уведомления!');
      return;
    }

    setIsLoading(true);

    if (typeof window.OneSignal !== 'undefined') {
      try {
        // Показываем нативное окно подписки OneSignal
        await window.OneSignal.showNativePrompt();
        
        // Проверяем статус после попытки подписки
        setTimeout(async () => {
          const subscription = await window.OneSignal.getSubscription();
          setIsSubscribed(subscription);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error subscribing:', err);
        setIsLoading(false);
      }
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
            disabled={isLoading}
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