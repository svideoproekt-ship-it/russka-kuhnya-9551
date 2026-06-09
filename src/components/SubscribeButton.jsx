import React, { useState, useEffect } from 'react';
import OneSignal from 'react-onesignal';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Проверяем статус через 1 секунду после загрузки
    const timer = setTimeout(async () => {
      try {
        const permission = await OneSignal.Notifications.permission;
        console.log('Разрешение:', permission);
        
        if (permission === 'granted') {
          setStatus('subscribed');
        } else if (permission === 'denied') {
          setStatus('blocked');
        }
      } catch (error) {
        console.error('Ошибка проверки статуса:', error);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    console.log('🔔 Клик по кнопке!');
    setStatus('loading');

    try {
      await OneSignal.Slidedown.promptPush();
      
      setTimeout(async () => {
        const permission = await OneSignal.Notifications.permission;
        console.log('Разрешение после запроса:', permission);
        
        if (permission === 'granted') {
          setStatus('subscribed');
          alert(' Отлично! Теперь ты будешь получать уведомления!');
        } else if (permission === 'denied') {
          setStatus('blocked');
        } else {
          setStatus('idle');
        }
      }, 1500);
    } catch (error) {
      console.error('❌ Ошибка:', error);
      setStatus('blocked');
      alert('⚠️ Не удалось подписаться: ' + error.message);
    }
  };

  return (
    <div className="subscribe-section">
      <div className="subscribe-container">
        <div className="subscribe-content">
          <div className="subscribe-icon-wrapper">
            <span className="subscribe-icon"></span>
          </div>
          
          <div className="subscribe-text">
            <h3 className="subscribe-title">
              {status === 'subscribed' ? 'Вы подписаны ✓' : 
               status === 'blocked' ? 'Уведомления заблокированы' : 
               'Подпишись на новые рецепты!'}
            </h3>
            <p className="subscribe-description">
              {status === 'subscribed' ? 'Ты будешь первым, кто узнает о новых рецептах' :
               status === 'blocked' ? 'Разреши уведомления в настройках браузера' :
               'Получай уведомления о новых рецептах русской кухни'}
            </p>
          </div>

          <button 
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={status === 'loading' || status === 'subscribed'}
          >
            <span>
              {status === 'loading' ? '⏳ Подписка...' : 
               status === 'subscribed' ? '✓ Подписан' : 
               ' Подписаться'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;