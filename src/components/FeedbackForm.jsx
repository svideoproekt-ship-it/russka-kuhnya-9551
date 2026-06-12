import React from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  // ВСТАВЬ СЮДА СВОЮ ССЫЛКУ НА GOOGLE ФОРМУ
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7V86jFEytJmRp.../viewform';

  const handleClick = () => {
    window.open(GOOGLE_FORM_URL, '_blank');
  };

  return (
    <button className="feedback-link" onClick={handleClick}>
      📝 Пожелания и предложения
    </button>
  );
};

export default FeedbackForm;