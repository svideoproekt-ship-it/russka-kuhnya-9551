import React, { useState, useEffect } from 'react';
import OneSignal from 'react-onesignal';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('loading'); // Начинаем с loading
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ждём пока OneSignal полностью инициализируется
    const initStatus = async () => {
      try {
        // Ждём пока OneSignal будет готов
        await OneSignal.ready();
        
        const permission = await OneSignal.Notifications.permission;
        console.log('OneSignal готов! Разрешение:', permission);
        
        if (permission === 'granted') {
          setStatus('subscribed');
        } else if (permission === 'denied') {
          setStatus('blocked');
        } else {
          setStatus('idle');
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Ошибка проверки статуса:', error);
        setStatus('idle');
        setIsReady(true);
      }
    };
    
    initStatus();
  }, []);

  const handleSubscribe = async () => {
    console.log('🔔 Клик по кнопке!');
    
    if (!isReady) {
      alert('⚠️ Подождите пока OneSignal загрузится...');
      return;
    }

    setStatus('loading');

    try {
      // Показываем слайд-даун
      await OneSignal.Slidedown.promptPush();
      
      // Ждём и проверяем статус
      setTimeout(async () => {
        const permission = await OneSignal.Notifications.permission;
        console.log('Разрешение после запроса:', permission);
        
        if (permission === 'granted') {
          setStatus('subscribed');
          alert('🔔 Отлично! Теперь ты будешь получать уведомления!');
        } else if (permission === 'denied') {
          setStatus('blocked');
        } else {
          setStatus('idle');
        }
      }, 2000);
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
            <span className="subscribe-icon">🔔</span>
          </div>
          
          <div className="subscribe-text">
            <h3 className="subscribe-title">
              {status === 'subscribed' ? 'Вы подписаны ✓' : 
               status === 'blocked' ? 'Уведомления заблокированы' : 
               status === 'loading' ? 'Проверка статуса...' :
               'Подпишись на новые рецепты!'}
            </h3>
            <p className="subscribe-description">
              {status === 'subscribed' ? 'Ты будешь первым, кто узнает о новых рецептах' :
               status === 'blocked' ? 'Разреши уведомления в настройках браузера' :
               status === 'loading' ? 'Подождите...' :
               'Получай уведомления о новых рецептах русской кухни'}
            </p>
          </div>

          <button 
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={!isReady || status === 'loading' || status === 'subscribed'}
          >
            <span>
              {!isReady ? '⏳ Загрузка...' :
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