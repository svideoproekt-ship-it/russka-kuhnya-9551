import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    
    // ВСТАВЬ СЮДА СВОЮ ССЫЛКУ НА GOOGLE ФОРМУ
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7V86jFEytJmRpbcCixQ3Ar6McHpTVOSnEwUlDSVsoPuOO3g/viewform?usp=publish-editor';
    
    // Открываем форму в новой вкладке
    window.open(GOOGLE_FORM_URL, '_blank');
    
    // Показываем успех
    setIsSent(true);
    setName('');
    setMessage('');
    
    // Закрываем модальное окно через 2 секунды
    setTimeout(() => {
      setIsSent(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button className="feedback-link" onClick={() => setIsOpen(true)}>
        📝 Пожелания и предложения
      </button>

      {isOpen && (
        <div className="feedback-overlay" onClick={() => setIsOpen(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button className="feedback-close" onClick={() => setIsOpen(false)}>×</button>
            
            <h2>Пожелания и предложения</h2>
            <p className="feedback-subtitle">Ваше мнение помогает нам становиться лучше!</p>

            {isSent ? (
              <div className="feedback-success">
                <span className="success-icon">✅</span>
                <p>Спасибо за ваш отзыв!</p>
                <p className="success-subtext">Мы обязательно его прочитаем</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                  <label htmlFor="name">Ваше имя (необязательно)</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Ваше сообщение *</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Расскажите, что вам понравилось или что можно улучшить..."
                    required
                    rows="5"
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={!message.trim()}>
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;