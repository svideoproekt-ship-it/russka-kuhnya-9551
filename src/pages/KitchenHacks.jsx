import React, { useState } from 'react';
import './KitchenHacks.css';

const KitchenHacks = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const hacks = [
    {
      id: 1,
      title: 'Как сохранить зелень свежей 2 недели',
      category: 'Хранение',
      time: '5 минут',
      difficulty: 'Легко',
      icon: '🌿',
      description: 'Поставьте пучок в стакан с водой как букет и накройте пакетом. Меняйте воду каждые 2-3 дня.',
      steps: [
        'Промойте зелень холодной водой',
        'Обрежьте кончики стеблей',
        'Поставьте в стакан с водой (5 см)',
        'Накройте сверху пакетом с дырочками',
        'Храните в холодильнике',
      ],
    },
    {
      id: 2,
      title: 'Как наточить нож за 30 секунд',
      category: 'Инструменты',
      time: '30 секунд',
      difficulty: 'Легко',
      icon: '🔪',
      description: 'Используйте дно керамической тарелки - оно работает как точильный камень!',
      steps: [
        'Переверните тарелку вверх дном',
        'Найдите шершавый ободок на дне',
        'Проведите лезвием под углом 20°',
        'Повторите 5-7 раз с каждой стороны',
        'Протрите нож влажной тканью',
      ],
    },
    {
      id: 3,
      title: 'Как сварить идеальные яйца',
      category: 'Приготовление',
      time: '10 минут',
      difficulty: 'Средне',
      icon: '🥚',
      description: 'Секрет идеального желтка - холодная вода и точное время!',
      steps: [
        'Положите яйца в кастрюлю',
        'Залейте холодной водой (на 2 см выше)',
        'Доведите до кипения на среднем огне',
        'Выключите огонь и накройте крышкой',
        'Ждите: 6 мин - всмятку, 9 мин - в мешочек, 12 мин - вкрутую',
      ],
    },
    {
      id: 4,
      title: 'Как нарезать лук без слёз',
      category: 'Приготовление',
      time: '2 минуты',
      difficulty: 'Легко',
      icon: '🧅',
      description: 'Заморозьте лук на 15 минут перед нарезкой - слёзы гарантированно не появятся!',
      steps: [
        'Положите лук в морозилку на 15 минут',
        'Достаньте и быстро очистите',
        'Нарежьте острым ножом',
        'Работайте у открытого окна или включите вытяжку',
      ],
    },
    {
      id: 5,
      title: 'Как быстро очистить чеснок',
      category: 'Приготовление',
      time: '10 секунд',
      difficulty: 'Легко',
      icon: '',
      description: 'Положите зубчик в банку, закройте крышкой и потрясите 10 секунд!',
      steps: [
        'Отделите зубчики от головки',
        'Положите в стеклянную банку',
        'Закройте крышкой плотно',
        'Трясите 10-15 секунд',
        'Откройте - шелуха сама отделилась!',
      ],
    },
    {
      id: 6,
      title: 'Как сохранить сыр от плесени',
      category: 'Хранение',
      time: '1 минута',
      difficulty: 'Легко',
      icon: '🧀',
      description: 'Заверните сыр в пергаментную бумагу, а не в полиэтилен - он будет дышать!',
      steps: [
        'Купите пергаментную бумагу',
        'Заверните сыр плотно',
        'Положите в контейнер с крышкой',
        'Храните в овощном отсеке холодильника',
        'Меняйте бумагу раз в неделю',
      ],
    },
    {
      id: 7,
      title: 'Как удалить запах с разделочной доски',
      category: 'Организация',
      time: '5 минут',
      difficulty: 'Легко',
      icon: '🪵',
      description: 'Насыпьте соль и потрите половиной лимона - запах исчезнет мгновенно!',
      steps: [
        'Насыпьте крупную соль на доску',
        'Разрежьте лимон пополам',
        'Потрите доску лимоном круговыми движениями',
        'Оставьте на 5 минут',
        'Смойте тёплой водой',
      ],
    },
    {
      id: 8,
      title: 'Как сделать пышные блины',
      category: 'Приготовление',
      time: '15 минут',
      difficulty: 'Средне',
      icon: '🥞',
      description: 'Секрет - тёплое молоко и взбитые белки отдельно!',
      steps: [
        'Подогрейте молоко до 35-40°C',
        'Отделите белки от желтков',
        'Взбейте белки в крепкую пену',
        'Смешайте тесто без белков',
        'Аккуратно вмешайте белки в конце',
      ],
    },
    {
      id: 9,
      title: 'Как хранить хлеб свежим дольше',
      category: 'Хранение',
      time: '1 минута',
      difficulty: 'Легко',
      icon: '🍞',
      description: 'Храните хлеб в льняном мешочке - он дышит и не плесневеет!',
      steps: [
        'Купите льняной мешочек для хлеба',
        'Положите хлеб внутрь',
        'Храните при комнатной температуре',
        'Не храните в холодильнике - черствеет быстрее!',
        'Для долгого хранения - заморозьте',
      ],
    },
    {
      id: 10,
      title: 'Как быстро охладить напиток',
      category: 'Приготовление',
      time: '5 минут',
      difficulty: 'Легко',
      icon: '',
      description: 'Оберните бутылку мокрой бумажной салфеткой и положите в морозилку!',
      steps: [
        'Смочите бумажное полотенце водой',
        'Оберните бутылку/банку',
        'Положите в морозилку',
        'Ждите 10-15 минут',
        'Напиток остынет в 3 раза быстрее!',
      ],
    },
  ];

  const categories = ['all', 'Хранение', 'Приготовление', 'Инструменты', 'Организация'];

  const filteredHacks = activeCategory === 'all' 
    ? hacks 
    : hacks.filter(hack => hack.category === activeCategory);

  // Функция поделиться
  const handleShare = async (hack) => {
    const shareUrl = 'https://russka-kuhnya-9551.vercel.app/kitchen-hacks';
    const shareText = `${hack.title} - Кухонные хитрости`;
    
    // Проверяем поддержку Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          text: hack.description,
          url: shareUrl,
        });
        console.log('✅ Успешно поделились!');
      } catch (error) {
        console.log('Отменено пользователем');
      }
    } else {
      // Fallback: копируем ссылку
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('✅ Ссылка скопирована в буфер обмена!');
      } catch (error) {
        console.error('Ошибка копирования:', error);
        alert('️ Не удалось скопировать ссылку');
      }
    }
  };

  return (
    <div className="kitchen-hacks-page">
      {/* Шапка */}
      <header className="hacks-header">
        <div className="hacks-header-content">
          <span className="hacks-header-icon">💡</span>
          <h1>Кухонные хитрости</h1>
          <p>Полезные советы для приготовления, хранения и организации кухни</p>
        </div>
      </header>

      {/* Фильтр категорий */}
      <div className="hacks-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'Все советы' : cat}
          </button>
        ))}
      </div>

      {/* Сетка лайфхаков */}
      <div className="hacks-grid">
        {filteredHacks.map((hack) => (
          <div key={hack.id} className="hack-card">
            <div className="hack-card-header">
              <span className="hack-icon">{hack.icon}</span>
              <span className="hack-category-badge">{hack.category}</span>
            </div>
            
            <div className="hack-card-body">
              <h3>{hack.title}</h3>
              <p className="hack-description">{hack.description}</p>
              
              <div className="hack-steps">
                <h4>Как сделать:</h4>
                <ol>
                  {hack.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="hack-card-footer">
              <span className="hack-meta">⏱️ {hack.time}</span>
              <span className="hack-meta">📊 {hack.difficulty}</span>
              <button 
                className="hack-share-btn"
                onClick={() => handleShare(hack)}
                title="Поделиться"
              >
                📤
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Подвал */}
      <footer className="hacks-footer">
        <p>💡 Хотите больше хитростей? Подпишитесь на уведомления!</p>
        <a href="/" className="hacks-back-link">← Вернуться на главную</a>
      </footer>
    </div>
  );
};

export default KitchenHacks;