import Breadcrumbs from '../components/Breadcrumbs';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { soupsData } from '../data/soupsData';
import './Soups.css';

const Soups = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const modernSoups = [
    {
      id: 103,
      name: "Сырный суп с плавленым сыром",
      epoch: "Советская классика 1970-х",
      time: "40 минут",
      image: "/images/soups/cheese-soup.jpg",
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
      image: "/images/soups/meatball-soup.jpg",
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
      image: "/images/soups/mushroom-cream-soup.jpg",
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
      image: "/images/soups/sorrel-soup.jpg",
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
      image: "/images/soups/fish-canned-soup.jpg",
      icon: "🐟",
      ingredients: ["Сайра консервированная 1 банка", "Картофель 4шт", "Морковь 1шт", "Лук 1шт", "Рис 3ст.л.", "Лавровый лист", "Соль, перец", "Зелень", "Лимон"],
      preparation: ["Вскипяти воду, добавь картофель и рис", "Обжарь лук и морковь", "Через 15 мин добавь зажарку", "Разомни консервы вилкой, добавь в суп", "Вари 10 минут", "Подавай с лимоном и зеленью"],
      history: "Стал массово популярен в СССР в послевоенные годы при дефиците свежей рыбы. До сих пор ассоциируется с быстрой домашней кухней."
    }
  ];

  const allSoups = [...soupsData, ...modernSoups];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipe');
    
    if (recipeId) {
      const recipe = allSoups.find(r => String(r.id) === String(recipeId));
      if (recipe) {
        setSelectedRecipe(recipe);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [allSoups]);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (recipe) => {
  // 🔥 ИСПРАВЛЕНО: ведём на отдельную страницу рецепта, а не ?recipe=...
  const shareUrl = `https://russka-kuhnya-9551.vercel.app/recipe/${recipe.id}`;
  
  if (navigator.share) {
    navigator.share({
      title: recipe.name || recipe.title,
      text: (recipe.history || recipe.description || '').substring(0, 150) + '...',
      url: shareUrl,
    }).catch(() => console.log('Отменено'));
  } else {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('✅ Ссылка скопирована!'))
      .catch(() => alert('❌ Ошибка'));
  }
};

  // 🔥 ДЕТАЛЬНЫЙ ПРОСМОТР РЕЦЕПТА
  if (selectedRecipe) {
    // Вычисляем правильный абсолютный URL картинки для соцсетей
    const rawImage = selectedRecipe.image;
    const seoImage = rawImage 
      ? (rawImage.startsWith('http') ? rawImage : `https://russka-kuhnya-9551.vercel.app${rawImage}`)
      : 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg';

    const recipeName = selectedRecipe.name || selectedRecipe.title || 'Рецепт';

    return (
      <>
        <SEO 
          title={`${recipeName} — Рецепт с фото | Русская Кухня`}
          description={selectedRecipe.history?.substring(0, 150) || recipeName}
          keywords="супы, русская кухня, рецепты"
          url={`https://russka-kuhnya-9551.vercel.app/recipe/${selectedRecipe.id}`}
          image={seoImage} 
        />
        
        <Breadcrumbs 
          recipeTitle={recipeName}
          categoryName="Супы"  
          categoryPath="/soups"
        />

        <div className="recipe-detail">
          <button onClick={handleBack} className="back-button">← Вернуться к списку</button>
          
          <div className="recipe-card">
            <div className="recipe-header">
              <h1>{recipeName}</h1>
              <div className="recipe-meta">
                <span className="epoch">🕰 {selectedRecipe.epoch}</span>
                <span className="time">⏱ {selectedRecipe.time}</span>
              </div>
            </div>

            <div className="recipe-top-actions">
              <button className="share-btn-top" onClick={() => handleShare(selectedRecipe)}>
                <span>📤</span> Поделиться рецептом
              </button>
            </div>

            {selectedRecipe.image && (
              <div className="recipe-image-container">
                <img 
                  loading="lazy"
                  src={selectedRecipe.image} 
                  alt={`${recipeName} — традиционный русский суп`}
                  className="recipe-image"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото'; }}
                />
              </div>
            )}

            <div className="recipe-content">
              <div className="recipe-section">
                <h2>📝 Ингредиенты</h2>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((item, index) => (
                    <li key={index}>{typeof item === 'string' ? item : `${item.name} ${item.amount} ${item.unit}`}</li>
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

              {selectedRecipe.history && (
                <div className="recipe-section history-section">
                  <h2>📚 Историческая справка</h2>
                  <p className="history-text">{selectedRecipe.history}</p>
                </div>
              )}
            </div> {/* Закрывает recipe-content */}
          </div> {/* Закрывает recipe-card */}
        </div> {/* Закрывает recipe-detail */}
      </>  
    );
  }

  // 🔥 СПИСОК ВСЕХ СУПОВ
  return (
    <div className="soups-category">
      <SEO 
        title="Супы - Традиционные русские рецепты | Русская Кухня"
        description="Лучшие рецепты русских супов: щи, борщ, солянка, уха и другие традиционные блюда."
        keywords="супы, русские супы, щи, борщ, солянка, рецепты супов"
        url="https://russka-kuhnya-9551.vercel.app/soups"
      />
      <Breadcrumbs />
      
      <div className="category-header">
        <Link to="/" className="back-home">← На главную</Link>
        <h1>🍲 Супы</h1>
        <p className="category-description">
          Традиционные русские супы — от древних щей до современных крем-супов
        </p>
      </div>

      <div className="recipes-grid">
        {allSoups.map((recipe) => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe)}
            style={{ cursor: 'pointer' }}
          >
            <div className="recipe-card-image">
              {recipe.image ? (
                <img 
                  loading="lazy"
                  src={recipe.image} 
                  alt={`${recipe.name || recipe.title} — русский суп`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото'; }}
                />
              ) : (
                <div className="no-image">{recipe.icon || '🍲'}</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name || recipe.title}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span>⏱ {recipe.time}</span>
              </div>
              <button className="view-recipe-btn">Смотреть рецепт</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Soups;