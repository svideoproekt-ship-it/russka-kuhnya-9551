import Breadcrumbs from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
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
      image: "/publicimagessoups/cheese-soup.jpg",
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
      image: "/publicimagessoups/meatball-soup.jpg",
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
      image: "/publicimagessoups/mushroom-cream-soup.jpg",
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
      image: "/publicimagessoups/sorrel-soup.jpg",
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
      image: "/publicimagessoups/fish-canned-soup.jpg",
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
      const recipe = allSoups.find(r => r.id === parseInt(recipeId));
      if (recipe) {
        setSelectedRecipe(recipe);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [allSoups]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (recipe) => {
    const shareUrl = `https://russka-kuhnya-9551.vercel.app/soups?recipe=${recipe.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: recipe.history.substring(0, 150) + '...',
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
      <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": selectedRecipe.name || selectedRecipe.title,
              "image": selectedRecipe.image ? 
                `https://russka-kuhnya-9551.vercel.app${selectedRecipe.image}` : 
                'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg',
              "description": selectedRecipe.description || selectedRecipe.history || '',
              "prepTime": selectedRecipe.time || 'PT30M',
              "recipeIngredient": selectedRecipe.ingredients || [],
              "recipeInstructions": (selectedRecipe.preparation || []).map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "text": step
              })),
              "author": {
                "@type": "Organization",
                "name": "Русская Кухня"
              },
              "recipeCategory": selectedRecipe.category || selectedRecipe.epoch || "Суп",
              "cuisine": "Русская кухня"
            })}
          </script>
        </Helmet>
        
        <div className="soups-category">
          <SEO 
  title="Рецепты супов — щи, борщ, уха, солянка | Русская Кухня"
  description="Лучшие рецепты русских супов с пошаговыми фото: классические щи, наваристый борщ, ароматная уха. Готовьте как в старину!"
  keywords="супы, щи, борщ, уха, солянка, рецепты супов, русская кухня"
  url="https://russka-kuhnya-9551.vercel.app/soups"
/>
<Breadcrumbs 
  recipeTitle={selectedRecipe.name}
  categoryName="Супы"  
  categoryPath="/soups"
/>

          <div className="recipe-detail">
  <button 
    onClick={() => window.location.href = '/soups'}
    className="back-button"
    style={{ 
      position: 'relative', 
      zIndex: 1000,
      cursor: 'pointer',
      pointerEvents: 'auto'
    }}
  >
    ← Вернуться к супам
  </button>
  
  <div className="recipe-card">
    
              <div className="recipe-header">
                <h1>{selectedRecipe.name}</h1>
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
  alt={`${selectedRecipe.name} — традиционный русский суп, пошаговый рецепт с фото`}
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
                  <h2>👨‍ Приготовление</h2>
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
              {/* ️ ДРУГИЕ РЕЦЕПТЫ */}
<div className="recipe-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '3px solid #FFD700' }}>
  <h2 style={{ color: '#8B0000', fontSize: '1.8rem', marginBottom: '20px' }}>🍽️ Другие рецепты</h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
    {(() => {
      // Получаем все рецепты кроме текущего
      const otherRecipes = allSoups.filter(r => r.id !== selectedRecipe.id);
      // Перемешиваем и берём 4 случайных
      const shuffled = otherRecipes.sort(() => 0.5 - Math.random()).slice(0, 4);
      
      return shuffled.map(recipe => (
        <div 
          key={recipe.id} 
          onClick={() => handleRecipeClick(recipe)}
          style={{ 
            background: 'linear-gradient(135deg, #FFF8DC, #FFE4B5)', 
            borderRadius: '12px', 
            padding: '12px', 
            cursor: 'pointer',
            border: '2px solid #FFD700',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textAlign: 'center'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {recipe.image && (
            <img 
              loading="lazy"
              src={recipe.image} 
              alt={recipe.name}
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <h4 style={{ color: '#8B0000', fontSize: '1rem', margin: '8px 0 4px 0', lineHeight: '1.3' }}>{recipe.name}</h4>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>⏱ {recipe.time}</span>
        </div>
      ));
    })()}
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </>  
    );
  }

  // СПИСОК ВСЕХ СУПОВ — СТАНДАРТНЫЙ СТИЛЬ КАК В ВЫПЕЧКЕ
  return (
    <div className="soups-category">
      <SEO 
        title="Супы - Традиционные русские рецепты | Русская Кухня"
        description="20 лучших рецептов русских супов от древности до наших дней. Щи, борщ, солянка, уха и другие традиционные блюда."
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
          >
            <div className="recipe-card-image">
              {recipe.image ? (
                <img 
  loading="lazy"
  src={recipe.image} 
  alt={`${recipe.name} — русский суп, рецепт с фото`}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото';
  }}
/>
              ) : (
                <div className="no-image">{recipe.icon || '🍲'}</div>
              )}
            </div>
            <div className="recipe-card-content">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-meta">
                <span>🕰 {recipe.epoch}</span>
                <span> {recipe.time}</span>
              </div>
              <button className="view-recipe-btn">
                Смотреть рецепт
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Soups;