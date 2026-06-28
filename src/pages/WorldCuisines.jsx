import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import './WorldCuisines.css';

const WorldCuisines = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const dishes = [
    {
      id: 1,
      title: 'Паста Карбонара',
      image: '/publicimagesworld/carbonara.jpg',
      country: 'Италия',
      flag: '🇮🇹',
      region: 'Европа',
      time: '25 минут',
      difficulty: 'Средне',
      icon: '🍝',
      description: 'Классическая римская паста с гуанчиале, яйцами и пармезаном. Главный секрет — НИКАКИХ сливок!',
      history: 'Карбонара появилась в Риме после Второй мировой войны. Название происходит от "carbonaro" — угольщик. По одной версии, блюдо придумали для рабочих-угольщиков, по другой — для американских солдат, которые просили бекон с яйцами.',
      funFact: 'В настоящей итальянской карбонаре НИКОГДА не добавляют сливки! Это нарушение традиций. Итальянцы считают это преступлением против кулинарии.',
      ingredients: [
        'Спагетти 400г',
        'Гуанчиале (или панчетта/бекон) 200г',
        'Яичные желтки 4шт',
        'Пармезан (тёртый) 100г',
        'Чёрный перец (свежемолотый)',
        'Соль (для воды)',
      ],
      steps: [
        'Вскипяти большую кастрюлю воды, посоли как море',
        'Нарежь гуанчиале брусочками 1×1 см',
        'Обжарь гуанчиале на сухой сковороде до хрустящей корочки (5-7 минут)',
        'Смешай желтки с тёртым пармезаном и щедро поперчи',
        'Отвари спагетти на 1 минуту меньше чем указано (аль денте)',
        'Переложи пасту в сковороду с гуанчиале (огонь ВЫКЛЮЧЕН!)',
        'Быстро влей яичную смесь и интенсивно мешай',
        'Жар пасты сварит яйца — получится кремовый соус',
        'Если слишком густо — добавь ложку воды от пасты',
        'Подавай сразу с дополнительным пармезаном и перцем',
      ],
    },
  ];

  const regions = ['all', 'Европа', 'Азия', 'Америка', 'Африка'];

  const filteredDishes = activeRegion === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.region === activeRegion);

  // Функция поделиться
  const handleShare = (dish) => {
    const shareUrl = 'https://russka-kuhnya-9551.vercel.app/world-cuisines';
    
    if (navigator.share) {
      navigator.share({
        title: dish.title,
        text: dish.description.substring(0, 150) + '...',
        url: shareUrl,
      }).catch(() => console.log('Отменено'));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('✅ Ссылка скопирована!'))
        .catch(() => alert('❌ Ошибка'));
    }
  };

  return (
    <div className="world-page">
     <SEO 
  title="Вкусы мира - Рецепты из разных стран | Русская Кухня"
  description="Путешествуйте по миру через вкус..."
  keywords="рецепты мира, кухни мира..."
  url="https://russka-kuhnya-9551.vercel.app/world-cuisines"
  image="https://russka-kuhnya-9551.vercel.app/og-fallback.jpg"
/>

      {/* Шапка */}
      <header className="world-header">
        <div className="world-header-content">
          <span className="world-header-icon">🌍</span>
          <h1>Вкусы мира</h1>
          <p>Путешествуйте по миру через вкус! Народные рецепты из разных стран</p>
          <p className="world-subtitle">🆕 Новый рецепт каждую неделю</p>
        </div>
      </header>

      {/* Фильтр по регионам */}
      <div className="world-filter">
        {regions.map((region) => (
          <button
            key={region}
            className={`filter-btn ${activeRegion === region ? 'active' : ''}`}
            onClick={() => setActiveRegion(region)}
          >
            {region === 'all' ? '🌍 Все страны' : region}
          </button>
        ))}
      </div>

      {/* Сетка рецептов */}
      <div className="dishes-grid">
       {filteredDishes.map((dish) => (
  <React.Fragment key={dish.id}>
    {/* ← ВСТАВЬ ВОТ ЭТОТ БЛОК */}
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": dish.title,
          "image": dish.image ? 
            `https://russka-kuhnya-9551.vercel.app${dish.image}` : 
            'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg',
          "description": dish.description || '',
          "prepTime": dish.time || 'PT30M',
          "recipeIngredient": dish.ingredients || [],
          "recipeInstructions": (dish.steps || []).map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "text": step
          })),
          "author": { "@type": "Organization", "name": "Русская Кухня" },
          "recipeCategory": dish.country || "Блюдо",
          "cuisine": dish.country || "Международная кухня"
        })}
      </script>
    </Helmet>
    <div className="dish-card world-card">
    <div className="dish-card-header">
      {dish.image ? (
        <img 
          src={dish.image} 
          alt={dish.title}
          className="dish-image"
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
        />
      ) : (
        <span className="dish-icon flag-icon">{dish.flag}</span>
      )}
      <span className="dish-category-badge">{dish.country}</span>
    </div>
  
  
            
            <div className="dish-card-body">
              <h3>{dish.title}</h3>
              <p className="dish-description">{dish.description}</p>
              
              {/* История блюда */}
              <div className="dish-history">
                <h4>📖 История блюда</h4>
                <p>{dish.history}</p>
              </div>

              {/* Интересный факт */}
              <div className="dish-fun-fact">
                <h4>💡 Интересный факт</h4>
                <p>{dish.funFact}</p>
              </div>

              {/* Ингредиенты */}
              <div className="dish-ingredients">
                <h4>🛒 Ингредиенты</h4>
                <ul>
                  {dish.ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
                </ul>
              </div>

              {/* Шаги приготовления */}
              <div className="dish-steps">
                <h4>👨‍🍳 Как приготовить</h4>
                <ol>
                  {dish.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="dish-card-footer">
              <span className="dish-meta">⏱️ {dish.time}</span>
              <span className="dish-meta">📊 {dish.difficulty}</span>
              <button 
                className="dish-share-btn"
                onClick={() => handleShare(dish)}
                title="Поделиться"
              >
                <span className="share-icon">📤</span>
                <span className="share-text">Поделиться</span>
              </button>
                  </div>
    </div>
    </React.Fragment>  
  ))}
</div>
       
    
    {/* Подвал */}
      <footer className="world-footer">
        <p>🌍 Следите за обновлениями! Каждую неделю — новый рецепт из другой страны</p>
        <a href="/" className="world-back-link">← Вернуться на главную</a>
      </footer>
    </div>   
     );   
};   

export default WorldCuisines;