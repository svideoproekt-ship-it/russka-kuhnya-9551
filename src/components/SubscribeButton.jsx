import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('idle');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('✅ SubscribeButton загружен');
    
    // Ждём пока OneSignal инициализируется
    const checkReady = setInterval(() => {
      if (window.OneSignalDeferred) {
        console.log('✅ OneSignalDeferred найден');
        
        // Пытаемся получить OneSignal объект
        window.OneSignalDeferred.push(function(OneSignal) {
          console.log('✅ OneSignal инициализирован в useEffect');
          console.log('OneSignal:', OneSignal);
          console.log('OneSignal.Notifications:', OneSignal.Notifications);
          setReady(true);
        });
        
        clearInterval(checkReady);
      }
    }, 1000);

    return () => clearInterval(checkReady);
  }, []);

  const handleSubscribe = () => {
    console.log('🔔 Клик по кнопке!');
    console.log('Готов?', ready);
    
    if (!ready) {
      alert('⚠️ Сервис уведомлений загружается. Подождите 5-10 секунд.');
      return;
    }

    setStatus('loading');

    if (!window.OneSignalDeferred) {
      alert('❌ OneSignal не найден!');
      setStatus('idle');
      return;
    }

    window.OneSignalDeferred.push(function(OneSignal) {
      console.log('✅ Запрашиваем разрешение...');
      
      if (OneSignal.Notifications && OneSignal.Notifications.requestPermission) {
        OneSignal.Notifications.requestPermission().then(function(permission) {
          console.log('Разрешение:', permission);
          
          if (permission === 'granted') {
            setStatus('subscribed');
            alert('🔔 Отлично! Ты подписан!');
          } else {
            setStatus('blocked');
          }
        }).catch(function(error) {
          console.error('❌ Ошибка:', error);
          setStatus('blocked');
          alert('⚠️ Ошибка: ' + error);
        });
      } else {
        console.error('❌ Notifications API не найден');
        console.log('Доступно:', Object.keys(OneSignal));
        alert('❌ Notifications API недоступен');
        setStatus('blocked');
      }
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
            disabled={!ready || status === 'loading' || status === 'subscribed'}
          >
            <span>
              {!ready ? '⏳ Загрузка...' :
               status === 'loading' ? '⏳ Подписка...' : 
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