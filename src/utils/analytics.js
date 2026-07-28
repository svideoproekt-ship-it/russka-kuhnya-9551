// src/utils/analytics.js

// 1. Функция для сохранения UTM-меток
export const captureUTM = () => {
  const params = new URLSearchParams(window.location.search);
  const utmData = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  utmKeys.forEach(key => {
    if (params.has(key)) {
      utmData[key] = params.get(key);
    }
  });

  // Если есть UTM-метки, сохраняем их в localStorage
  if (Object.keys(utmData).length > 0) {
    localStorage.setItem('last_utm_source', JSON.stringify(utmData));
    console.log('🕵️ UTM-метки сохранены:', utmData);
  }
};

// 2. Функция для отправки Целей в Яндекс Метрику
export const sendGoal = (goalName) => {
  if (window.ym) {
    // 110199727 - это номер твоего счётчика
    window.ym(110199727, 'reachGoal', goalName);
    console.log('🎯 Цель отправлена:', goalName);
  } else {
    console.warn('️ Яндекс Метрика ещё не загрузилась');
  }
};