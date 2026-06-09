import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('idle');
  const [oneSignalReady, setOneSignalReady] = useState(false);

  useEffect(() => {
    console.log('✅ SubscribeButton загружен');
    console.log('window.OneSignalDeferred:', window.OneSignalDeferred);
    console.log('window.OneSignal:', window.OneSignal);

    // Ждём пока OneSignal загрузится
    const checkOneSignal = setInterval(() => {
      if (window.OneSignalDeferred) {
        console.log('✅ OneSignalDeferred найден!');
        setOneSignalReady(true);
        clearInterval(checkOneSignal);
        
        // Проверяем статус подписки
        window.OneSignalDeferred.push(async function(OneSignal) {
          try {
            const permission = await OneSignal.Notifications.getPermission();
            console.log('Текущее разрешение:', permission);
            
            if (permission === 'granted') {
              setStatus('subscribed');
            }
          } catch (error) {
            console.error('Ошибка проверки разрешения:', error);
          }
        });
      }
    }, 500);

    return () => clearInterval(checkOneSignal);
  }, []);

  const handleSubscribe = async () => {
    console.log('🔔 Клик по кнопке!');
    console.log('OneSignal готов?', oneSignalReady);
    console.log('window.OneSignalDeferred:', window.OneSignalDeferred);
    
    if (!oneSignalReady || !window.OneSignalDeferred) {
      console.error('❌ OneSignal ещё не загрузился!');
      alert('⚠️ Сервис уведомлений загружается. Подождите 5-10 секунд и попробуйте снова.');
      return;
    }

    try {
      console.log('Запускаем OneSignalDeferred.push...');
      
      await window.OneSignalDeferred.push(async function(OneSignal) {
        console.log('✅ Inside push callback');
        console.log('OneSignal:', OneSignal);
        console.log('OneSignal.Notifications:', OneSignal.Notifications);
        
        // Проверяем текущее разрешение
        const permission = await OneSignal.Notifications.getPermission();
        console.log('Разрешение:', permission);

        if (permission === 'granted') {
          console.log('✅ Уже подписан!');
          setStatus('subscribed');
          alert('✅ Вы уже подписаны на уведомления!');
          return;
        }

        if (permission === 'default') {
          // Запрашиваем разрешение
          console.log('Запрашиваем разрешение...');
          await OneSignal.Notifications.requestPermission();
          console.log('Запрос отправлен!');
          
          // Проверяем результат
          setTimeout(async () => {
            const newPermission = await OneSignal.Notifications.getPermission();
            console.log('Новое разрешение:', newPermission);
            
            if (newPermission === 'granted') {
              setStatus('subscribed');
              alert('🔔 Отлично! Теперь ты будешь получать уведомления!');
            } else {
              setStatus('blocked');
            }
          }, 2000);
        }
      });
    } catch (error) {
      console.error('❌ Ошибка при подписке:', error);
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
            disabled={!oneSignalReady || status === 'loading' || status === 'subscribed'}
          >
            <span>
              {!oneSignalReady ? '⏳ Загрузка...' :
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