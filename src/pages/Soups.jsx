import React, { useState, useEffect } from 'react';  // ← Добавь useEffect
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { soupsData } from '../data/soupsData';
import './Soups.css';

const Soups = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const allSoups = [...soupsData, ...modernSoups];
  
  // ← ДОБАВЬ ЭТОТ КОД:
  
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipe');
  
  console.log('🔍 Recipe ID from URL:', recipeId);
  
  if (recipeId) {
    const allSoups = [...soupsData, ...modernSoups];
    const recipe = allSoups.find(r => {
      console.log(`📋 Comparing: ${r.id} === ${parseInt(recipeId)}`);
      return r.id === parseInt(recipeId);
    });
    
    console.log('🍲 Found recipe:', recipe);
    
    if (recipe) {
      setSelectedRecipe(recipe);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}, []);
  
  // ... остальной код

  // 5 современных популярных рецептов
  const modernSoups = [
  {
    id: 103,
    name: "Сырный суп с плавленым сыром",
    epoch: "Советская классика 1970-х",
    time: "40 минут",
    image: null, // заменишь на путь позже
    icon: "🧀",
    ingredients: ["Плавленый сыр 200г", "Куриное филе 300г", "Картофель 3шт", "Морковь 1шт", "Лук 1шт", "Сливочное масло 30г", "Соль, перец", "Зелень укропа", "Сухарики"],
    preparation: ["Свари филе, нарежь", "В бульон добавь картофель", "Обжарь лук и морковь", "Натри сыр, добавь в суп до растворения", "Верни курицу, посоли", "Вари 5 минут, подавай с сухариками"],
    history: "Сырные супы стали популярны в СССР в 1970-х с появлением сырков 'Дружба'. Быстрое, сытное блюдо, полюбившееся за простоту и насыщенный вкус."
  },
  {
    id: 104,
    name: "Суп с фрикадельками",
    epoch: "Интернациональная классика",
    time: "45 минут",
    image: null,
    icon: "🍖",
    ingredients: ["Говяжий фарш 400г", "Лук 1шт", "Яйцо 1шт", "Картофель 3шт", "Морковь 1шт", "Рис 2ст.л.", "Лавровый лист", "Соль, перец", "Зелень"],
    preparation: ["Смешай фарш с луком, яйцом, солью", "Скатай фрикадельки", "Вскипяти воду, опусти фрикадельки", "Добавь картофель", "Через 15 мин добавь зажарку", "Вари до готовности, подавай со сметаной"],
    history: "Популярен в советских столовых как быстрый способ приготовить сытный обед без долгой варки мяса. Аналог итальянских полпеттине и шведских кёттбуллар."
  },
  {
    id: 105,
    name: "Сливочный суп с шампиньонами",
    epoch: "Современная кухня",
    time: "50 минут",
    image: null,
    icon: "🍄",
    ingredients: ["Шампиньоны 500г", "Картофель 3шт", "Лук 1шт", "Сливки 10% 200мл", "Сливочное масло 50г", "Лавровый лист", "Соль, перец", "Зелень"],
    preparation: ["Нарежь грибы, обжарь на масле", "Добавь лук, жарь 5 минут", "Вскипяти воду, добавь картофель", "Через 10 минут добавь грибы", "Влей сливки, прогрей 2 минуты", "Подавай с зеленью"],
    history: "Отличается от традиционного грибного супа использованием свежих шампиньонов и сливок. Стал популярен с 1990-х как ресторанное блюдо."
  },
  {
    id: 107,
    name: "Щавелевый суп с яйцом",
    epoch: "Весенняя классика",
    time: "35 минут",
    image: null,
    icon: "🌿",
    ingredients: ["Щавель свежий 300г", "Яйца 3шт", "Картофель 3шт", "Морковь 1шт", "Лук 1шт", "Сметана", "Соль, щепотка сахара", "Укроп"],
    preparation: ["Свари яйца вкрутую", "В воду добавь картофель", "Обжарь лук и морковь", "Добавь щавель и зажарку", "Вари 7 минут", "Подавай с нарезанным яйцом и сметаной"],
    history: "Одно из первых весенних блюд на Руси. Называли 'зелёные щи'. Символ обновления после долгой зимы."
  },
  {
    id: 110,
    name: "Рыбный суп из консервов (сайра)",
    epoch: "Советская классика",
    time: "30 минут",
    image: null,
    icon: "",
    ingredients: ["Сайра консервированная 1 банка", "Картофель 4шт", "Морковь 1шт", "Лук 1шт", "Рис 3ст.л.", "Лавровый лист", "Соль, перец", "Зелень", "Лимон"],
    preparation: ["Вскипяти воду, добавь картофель и рис", "Обжарь лук и морковь", "Через 15 мин добавь зажарку", "Разомни консервы вилкой, добавь в суп", "Вари 10 минут", "Подавай с лимоном и зеленью"],
    history: "Стал массово популярен в СССР в послевоенные годы при дефиците свежей рыбы. До сих пор ассоциируется с быстрой домашней кухней."
  }
];

  // Объединяем традиционные (15) и современные (5)
  const allSoups = [...soupsData, ...modernSoups];

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Кнопка "Поделиться"
  const handleShare = (dish) => {
  const shareUrl = 'https://russka-kuhnya-9551.vercel.app/seasonal-dishes';
  
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
  // Детальный просмотр
  if (selectedRecipe) {
    return (
      <div className="soups-page">
        <SEO 
          title={`${selectedRecipe.name} - Рецепт с историей | Русская Кухня`}
          description={`${selectedRecipe.name}. Время: ${selectedRecipe.time}. Эпоха: ${selectedRecipe.epoch}. ${selectedRecipe.history}`}
          keywords={`${selectedRecipe.name}, рецепт, русская кухня, ${selectedRecipe.epoch}`}
          url={`https://russka-kuhnya-9551.vercel.app/soups?id=${selectedRecipe.id}`}
        />

        <div className="soup-detail">
          <button className="back-button" onClick={handleBack}>
            ← Назад к списку
          </button>
          
          <div className="recipe-card">
            <div className="recipe-header">
              <h1>{selectedRecipe.name}</h1>
              <div className="recipe-meta">
                <span className="epoch">🕰 {selectedRecipe.epoch}</span>
                <span className="time">⏱ {selectedRecipe.time}</span>
              </div>
            </div>
            {/* Кнопка Поделиться в начале рецепта */}
            <div className="recipe-top-actions">
              <button className="share-btn-top" onClick={() => handleShare(selectedRecipe)}>
                <span>📤</span> Поделиться рецептом
              </button>
            </div>

            {selectedRecipe.image && (
              <div className="recipe-image-container">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.name}
                  className="recipe-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото';
                  }}
                />
              </div>
            )}

            {selectedRecipe.icon && !selectedRecipe.image && (
              <div className="recipe-icon-large">{selectedRecipe.icon}</div>
            )}

            <div className="recipe-content">
              <div className="recipe-section">
                <h2>📝 Ингредиенты</h2>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-section">
                <h2>👨‍🍳 Приготовление</h2>
                <ol className="preparation-list">
                  {selectedRecipe.preparation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="recipe-section history-section">
                <h2>📚 Историческая справка</h2>
                <p className="history-text">{selectedRecipe.history}</p>
              </div>
            </div>

            <div className="recipe-actions">
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Список всех супов
  return (
    <div className="soups-page">
      <SEO 
        title="Самые популярные супы - 25 рецептов с историей | Русская Кухня"
        description="25 лучших рецептов супов: 15 традиционных русских (щи, борщ, солянка) + 10 популярных (гороховый, куриный, сырный, харчо). Пошаговые рецепты с историей каждого блюда!"
        keywords="рецепты супов, щи, борщ, солянка, рассольник, уха, гороховый суп, куриный суп, сырный суп, харчо, грибной суп, русская кухня"
        url="https://russka-kuhnya-9551.vercel.app/soups"
      />

      <header className="soups-header">
        <div className="soups-header-content">
          <span className="soups-header-icon">🍲</span>
          <h1>Самые популярные супы</h1>
          <p className="soups-subtitle">📖 С историей каждого блюда</p>
        </div>
      </header>

      
      <div className="soups-grid">
        {allSoups.map((soup) => (
          <div 
            key={soup.id} 
            className="soup-card"
            onClick={() => handleRecipeClick(soup)}
          >
            <div className="soup-card-header">
              {soup.image ? (
                <img src={soup.image} alt={soup.name} className="soup-card-image" />
              ) : (
                <span className="soup-icon">{soup.icon || '🍲'}</span>
              )}
              <span className="soup-category-badge">{soup.epoch.split(' ')[0]}</span>
            </div>
            
            <div className="soup-card-body">
              <h3>{soup.name}</h3>
              
              <div className="soup-meta-inline">
                <span>⏱ {soup.time}</span>
                <span>🕰 {soup.epoch}</span>
              </div>
            </div>

            <div className="soup-card-footer">
              <button className="read-more-btn">
                Смотреть рецепт →
              </button>
              
            </div>
          </div>
        ))}
      </div>

      <footer className="soups-footer">
        <p>🍲 Приятного аппетита! Готовьте с любовью и делитесь с близкими!</p>
        <Link to="/" className="soups-back-link">← Вернуться на главную</Link>
      </footer>
    </div>
  );
};

export default Soups;