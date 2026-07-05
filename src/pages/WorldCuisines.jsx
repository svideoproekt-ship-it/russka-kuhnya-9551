import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import './WorldCuisines.css';
import SEO from '../components/SEO';

const WorldCuisines = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const dishes = [
    {
      id: 1,
      title: 'Паста Карбонара',
      image: '/publicimagesworld/carbonara.jpg',
      country: 'Италия',
      flag: '🇹',
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
    {
      id: 2,
      title: 'Пастел (Бразильские пирожки)',
      image: '/publicimagesworld/pastel-brazil.jpg',
      country: 'Бразилия',
      flag: '🇧🇷',
      region: 'Америка',
      time: '45 минут',
      difficulty: 'Средне',
      icon: '🥟',
      description: 'Хрустящие жареные пирожки с картофелем и колбасой — самая популярная уличная еда Бразилии!',
      history: 'Пастел появился в Бразилии в 1940-х годах на ярмарках. Японские иммигранты принесли технику жарки во фритюре, а португальцы — идею пирожков. Сегодня пастел — культовая уличная еда, которую продают на каждой ярмарке (feira).',
      funFact: 'В Бразилии есть день пастела — 17 июля! Бразильцы съедают МИЛЛИОНЫ пирожков каждый день. Классическая начинка — картофель с колбасой (calabresa) или мясо (carne).',
      ingredients: [
        'Мука 3 стакана',
        'Вода тёплая 1 стакан',
        'Яйцо 1шт',
        'Соль 1ч.л.',
        'Картофель 3шт (сварить)',
        'Колбаса чоризо/кальбаса 200г',
        'Лук 1шт',
        'Чеснок 2 зубчика',
        'Масло растительное для жарки (глубокий фритюр)',
      ],
      steps: [
        'Замеси тесто: мука, вода, яйцо, соль. Замеси крутое тесто',
        'Оставь тесто на 30 минут под полотенцем',
        'Нарежь картофель кубиками',
        'Обжарь лук и чеснок',
        'Добавь нарезанную колбасу, жарь 5 минут',
        'Добавь картофель, посоли, перемешай — начинка готова',
        'Раскатай тесто тонко (2-3мм)',
        'Вырежи кружки диаметром 15см',
        'Положи начинку на половину кружка',
        'Накрой второй половиной, защипни края вилкой',
        'Разогрей масло в глубокой сковороде (180°C)',
        'Жарь пастел по 2-3 минуты с каждой стороны до золотистого цвета',
        'Выложи на бумажное полотенце (убрать лишнее масло)',
        'Подавай горячим с соусом из перца или кетчупом!',
      ],
    },
    {
    id: 3,
    title: 'Мусака (Греческая запеканка)',
    image: '/publicimagesworld/moussaka-greece.jpg',
    country: 'Греция',
    flag: '🇬🇷',
    region: 'Европа',
    time: '1 час 30 минут',
    difficulty: 'Средне',
    icon: '🥘',
    description: 'Слоёная запеканка из баклажанов, фарша и соуса бешамель — визитная карточка греческой кухни!',
    history: 'Современная мусака появилась в 1920-х годах благодаря греческому шеф-повару Николаосу Целементесу. Он добавил соус бешамель к традиционному блюду из баклажанов и мяса. Сегодня мусака — самое популярное блюдо Греции!',
    funFact: 'В Греции мусаку готовят почти в каждой семье по воскресеньям. Настоящая мусака должна иметь 3 слоя: баклажаны, мясной фарш и бешамель. Греки спорят о рецепте уже 100 лет!',
    ingredients: [
      'Баклажаны 3-4шт (крупные)',
      'Говяжий фарш 500г',
      'Лук 2шт',
      'Чеснок 3 зубчика',
      'Томатная паста 2ст.л.',
      'Красное вино 100мл (по желанию)',
      'Корица молотая 1ч.л.',
      'Оливковое масло',
      'Сливочное масло 50г',
      'Мука 3ст.л.',
      'Молоко 500мл',
      'Пармезан (тёртый) 100г',
      'Яичные желтки 2шт',
      'Соль, перец, мускатный орех',
    ],
    steps: [
      'Нарежь баклажаны кружками 1см, посоли, оставь на 30 минут',
      'Обжарь баклажаны на оливковом масле до золотистого цвета',
      'Обжарь лук и чеснок до мягкости',
      'Добавь фарш, жарь 10 минут до готовности',
      'Добавь томатную пасту, вино, корицу, соль и перец',
      'Туши 15 минут на медленном огне',
      'Приготовь бешамель: растопи масло, добавь муку, жарь 2 минуты',
      'Влей молоко постепенно, помешивая, до загустения',
      'Сними с огня, добавь пармезан, желтки, мускатный орех',
      'Выложи первый слой: половина баклажанов',
      'Второй слой: весь фарш',
      'Третий слой: оставшиеся баклажаны',
      'Залей бешамелем, разровняй',
      'Запекай при 180°C 45 минут до золотистой корочки',
      'Дай постоять 15 минут перед подачей!',
    ],
  },
  ];
  
  // ← ДОБАВИЛИ ЭТИ ТРИ СТРОКИ!
  const regions = ['all', 'Европа', 'Азия', 'Америка', 'Африка'];

  const filteredDishes = activeRegion === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.region === activeRegion);

  const handleShare = (dish) => {
    const shareUrl = `https://russka-kuhnya-9551.vercel.app/world-cuisines`;
    
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
  title="Вкусы мира — рецепты разных стран | Русская Кухня"
  description="Путешествуйте со вкусом! Рецепты из разных стран: греческая мусака, японские онигири, мексиканские такос. Новый рецепт каждую неделю!"
  keywords="мировая кухня, рецепты стран, греческая кухня, японская кухня, мексиканская кухня"
  url="https://russka-kuhnya-9551.vercel.app/world-cuisines"
/>
/

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
    {/* Schema.org разметка */}
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
          loading="lazy"
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