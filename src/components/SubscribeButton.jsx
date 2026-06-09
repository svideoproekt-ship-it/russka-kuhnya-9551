import React, { useState } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('idle');

  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    
    if (!window.OneSignalDeferred) {
      alert('⚠️ Сервис уведомлений загружается. Подождите несколько секунд.');
      return;
    }

    setStatus('loading');

    // Просто вызываем OneSignal
    window.OneSignalDeferred.push(function(OneSignal) {
      console.log('✅ OneSignal callback вызван');
      console.log('OneSignal:', OneSignal);
      console.log('OneSignal.Notifications:', OneSignal.Notifications);
      
      // Проверяем что Notifications существует
      if (!OneSignal.Notifications || !OneSignal.Notifications.requestPermission) {
        console.error('❌ OneSignal.Notifications.requestPermission не найден!');
        console.log('Доступные методы:', Object.keys(OneSignal));
        alert('❌ Ошибка: Notifications API недоступен. Проверь настройки OneSignal.');
        setStatus('blocked');
        return;
      }

      // Запрашиваем разрешение
      console.log('🔔 Запрашиваем разрешение...');
      
      OneSignal.Notifications.requestPermission().then(function(permission) {
        console.log('Разрешение:', permission);
        
        if (permission === 'granted') {
          setStatus('subscribed');
          alert('🔔 Отлично! Теперь ты будешь получать уведомления!');
        } else {
          setStatus('blocked');
        }
      }).catch(function(error) {
        console.error('❌ Ошибка:', error);
        setStatus('blocked');
        alert('⚠️ Не удалось подписаться: ' + error);
      });
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
               '🔔 Подписаться'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeButton;