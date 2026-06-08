import React, { useState, useEffect } from 'react';
import './SubscribeButton.css';

const SubscribeButton = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'subscribed' | 'blocked'

  useEffect(() => {
    // Проверяем текущее состояние при загрузке
    if (typeof window.OneSignal !== 'undefined') {
      window.OneSignal.push(async function() {
        try {
          // Проверяем разрешение
          const permission = await OneSignal.Notifications.getPermission();
          console.log('Текущее разрешение:', permission);
          
          if (permission === true) {
            setStatus('subscribed');
          } else if (permission === false) {
            setStatus('idle');
          }
        } catch (error) {
          console.error('Ошибка проверки разрешения:', error);
        }
      });
    }
  }, []);

  const handleSubscribe = async () => {
    console.log('🔔 Клик по кнопке!');
    setStatus('loading');

    if (typeof window.OneSignal === 'undefined') {
      alert('⚠️ Сервис уведомлений загружается. Подождите несколько секунд.');
      setStatus('idle');
      return;
    }

    try {
      await window.OneSignal.push(async function() {
        // Проверяем текущее разрешение
        const permission = await OneSignal.Notifications.getPermission();
        console.log('Разрешение перед запросом:', permission);

        if (permission === true) {
          console.log('✅ Уже подписан!');
          setStatus('subscribed');
          alert('✅ Вы уже подписаны на уведомления!');
          return;
        }

        if (permission === false) {
          // Запрашиваем разрешение - это вызовет окно браузера!
          console.log('Запрашиваем разрешение...');
          await OneSignal.Notifications.requestPermission();
          
          // Проверяем результат
          setTimeout(async () => {
            const newPermission = await OneSignal.Notifications.getPermission();
            if (newPermission === true) {
              console.log('✅ Подписка успешна!');
              setStatus('subscribed');
              alert('🔔 Отлично! Теперь ты будешь получать уведомления!');
            } else {
              console.log('❌ Пользователь отклонил');
              setStatus('blocked');
            }
          }, 1000);
        }
      });
    } catch (error) {
      console.error('❌ Ошибка при подписке:', error);
      setStatus('blocked');
      alert('⚠️ Не удалось подписаться. Проверь настройки браузера.');
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