import React, { useState } from 'react';
import './NotificationHelp.css';

const NotificationHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="help-btn" onClick={() => setIsOpen(true)}>
        ❓ Как включить уведомления
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}></button>
            
            <h2>Как включить уведомления</h2>
            
            <div className="browser-instructions">
              <div className="browser-section">
                <h3> На телефоне (Android/Chrome)</h3>
                <ol>
                  <li>Нажмите на <strong>замочек 🔒</strong> слева от адреса сайта</li>
                  <li>Найдите <strong>"Настройки сайта"</strong></li>
                  <li>Найдите <strong>"Уведомления"</strong></li>
                  <li>Переключите на <strong>"Разрешить"</strong></li>
                  <li>Вернитесь и нажмите кнопку подписки снова</li>
                </ol>
              </div>

              <div className="browser-section">
                <h3>🍎 На iPhone (Safari)</h3>
                <ol>
                  <li>Откройте <strong>Настройки</strong> телефона</li>
                  <li>Найдите <strong>Safari</strong></li>
                  <li>Нажмите <strong>"Уведомления"</strong></li>
                  <li>Включите <strong>"Разрешить уведомления"</strong></li>
                  <li>Вернитесь на сайт и подпишитесь</li>
                </ol>
              </div>

              <div className="browser-section">
                <h3>💻 На компьютере (Chrome)</h3>
                <ol>
                  <li>Нажмите на <strong>замочек 🔒</strong> слева от адреса</li>
                  <li>Найдите <strong>"Настройки сайта"</strong></li>
                  <li>Найдите <strong>"Уведомления"</strong></li>
                  <li>Выберите <strong>"Разрешить"</strong></li>
                  <li>Обновите страницу и подпишитесь</li>
                </ol>
              </div>

              <div className="browser-section">
                <h3> На компьютере (Firefox)</h3>
                <ol>
                  <li>Нажмите на <strong>замочек 🔒</strong> слева от адреса</li>
                  <li>Нажмите <strong>"Ещё информации"</strong></li>
                  <li>Перейдите во вкладку <strong>"Разрешения"</strong></li>
                  <li>Найдите <strong>"Отправлять уведомления"</strong></li>
                  <li>Снимите галочку <strong>"Использовать по умолчанию"</strong></li>
                  <li>Выберите <strong>"Разрешить"</strong></li>
                </ol>
              </div>
            </div>

            <div className="modal-footer">
              <p>💡 После настройки вернитесь и нажмите кнопку подписки!</p>
              <button className="modal-ok" onClick={() => setIsOpen(false)}>
                Понятно!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationHelp;