import Breadcrumbs from '../components/Breadcrumbs';
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'; // 🔥 ДОБАВИЛИ useLocation
import { Helmet } from 'react-helmet-async';
import { soupsData } from '../data/soupsData';
import { bakingData } from '../data/bakingData';
import { meatData } from '../data/meatData';
import { fishData } from '../data/fishData';
import { snacksData } from '../data/snacksData';
import { dessertsData } from '../data/dessertsData';
import { drinksData } from '../data/drinksData';
import { doughData } from '../data/doughData';
import { porridgeData } from '../data/porridgeData';
import ShareButtons from '../components/ShareButtons';

const RecipePage = () => {
  const { id } = useParams();
  const location = useLocation(); // 🔥 ПОЛУЧАЕМ ДОСТУП К URL
  
  // 🔥 ЧИТАЕМ ПОДСКАЗКУ КАТЕГОРИИ ИЗ URL (например, ?from=dough)
  const searchParams = new URLSearchParams(location.search);
  const fromCategory = searchParams.get('from');

  // 1. Определяем категории, их пути и добавляем slug для точного поиска
  const categories = [
    { data: soupsData, name: 'Супы', path: '/soups', slug: 'soups' },
    { data: bakingData, name: 'Выпечка', path: '/category/baking', slug: 'baking' },
    { data: meatData, name: 'Мясо', path: '/category/meat', slug: 'meat' },
    { data: fishData, name: 'Рыба', path: '/category/fish', slug: 'fish' },
    { data: snacksData, name: 'Закуски', path: '/category/snacks', slug: 'snacks' },
    { data: dessertsData, name: 'Десерты', path: '/category/desserts', slug: 'desserts' },
    { data: drinksData, name: 'Напитки', path: '/category/drinks', slug: 'drinks' },
    { data: doughData, name: 'Тесто', path: '/category/dough', slug: 'dough' },
    { data: porridgeData, name: 'Каши', path: '/category/porridge', slug: 'porridge' },
  ];

  let recipe = null;
  let recipeCategory = { name: 'Рецепты', path: '/', data: [] };

  // 🔥 ШАГ А: ЕСЛИ ЕСТЬ ПОДСКАЗКА, ИЩЕМ СНАЧАЛА В ЭТОЙ КАТЕГОРИИ
  if (fromCategory) {
    const targetCat = categories.find(c => c.slug === fromCategory);
    if (targetCat) {
      const found = targetCat.data.find(r => String(r.id) === String(id));
      if (found) {
        recipe = found;
        recipeCategory = { name: targetCat.name, path: targetCat.path, data: targetCat.data };
      }
    }
  }

  // 🔥 ШАГ Б: ЕСЛИ НЕ НАШЛИ ИЛИ ПОДСКАЗКИ НЕТ, ИЩЕМ ПО ВСЕМ КАТЕГОРИЯМ (FALLBACK)
  if (!recipe) {
    for (const cat of categories) {
      const found = cat.data.find(r => String(r.id) === String(id));
      if (found) {
        recipe = found;
        recipeCategory = { name: cat.name, path: cat.path, data: cat.data };
        break;
      }
    }
  }

  // 3. Обработка "не найдено"
  if (!recipe) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(160deg, #0a0a2a 0%, #001f3f 100%)', color: '#fff', fontFamily: "'Times New Roman', serif" }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>😔 Рецепт не найден</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#b2ebf2' }}>Запрашиваемый ID: {id}</p>
        <Link to="/" style={{ display: 'inline-block', padding: '12px 24px', background: 'linear-gradient(135deg, #00BFFF, #008080)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          ← Вернуться на главную
        </Link>
      </div>
    );
  }

  // 4. Нормализация полей
  const title = recipe.title || recipe.name || 'Без названия';
  const ingredients = recipe.ingredients || [];
  const steps = recipe.steps || recipe.preparation || [];
  const image = recipe.image || '';
  const epoch = recipe.epoch || '';
  const time = recipe.time || '';
  const history = recipe.history || '';

  // 5. SEO-переменные для Helmet
  const canonicalUrl = `${window.location.origin}/recipe/${recipe.id}`;
  const metaTitle = `${title} — Русская Кухня`;
  const metaDesc = `Рецепт: ${title}. ${epoch ? `Эпоха: ${epoch}.` : ''} ${time ? `Время приготовления: ${time}.` : ''} ${history ? history.slice(0, 150) + '...' : 'Традиционный русский рецепт с исторической справкой.'}`;
  
  const ogImage = image 
    ? (image.startsWith('http') 
        ? image 
        : `https://russka-kuhnya-9551.vercel.app${image}`)
    : 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg';

  // 6. Рендер страницы
  return (
    <>
      {/* 🔹 ВСЕ МЕТА-ТЕГИ И SCHEMA В ОДНОМ HELMET */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Schema.org Recipe */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": title,
            "image": ogImage,
            "description": metaDesc,
            "author": { "@type": "Organization", "name": "Русская Кухня", "url": "https://russka-kuhnya-9551.vercel.app" },
            "datePublished": recipe.datePublished || "2026-07-07",
            "prepTime": recipe.prepTime || time || "PT30M",
            "cookTime": recipe.cookTime || "PT1H",
            "totalTime": recipe.totalTime || "PT1H30M",
            "recipeYield": recipe.yield || recipe.servings || "4 порции",
            "recipeCategory": recipe.category || "Основное блюдо",
            "recipeCuisine": recipe.cuisine || "Русская",
            "keywords": recipe.keywords || `${title}, рецепт, русская кухня`,
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": recipe.calories || "300 ккал",
              "fatContent": recipe.fat || "15 г",
              "proteinContent": recipe.protein || "20 г",
              "carbohydrateContent": recipe.carbs || "35 г"
            },
            "recipeIngredient": ingredients.map(i => typeof i === 'string' ? i : `${i.name} ${i.amount} ${i.unit}`),
            "recipeInstructions": steps.map((s, idx) => ({ "@type": "HowToStep", "position": idx + 1, "text": s })),
            "aggregateRating": recipe.rating ? { "@type": "AggregateRating", "ratingValue": recipe.rating, "ratingCount": recipe.ratingCount || 1 } : undefined
          })}
        </script>

        {/* 🧠 FAQ SCHEMA ДЛЯ GOOGLE */}
        {recipe.faq && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": recipe.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      {/* 🔹 Визуальный контент */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0a0a2a 0%, #001f3f 100%)', padding: '20px', fontFamily: "'Times New Roman', serif" }}>
        
        {/* Кнопка Назад */}
        <button
          onClick={() => window.history.back()}
          style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 20px', background: 'linear-gradient(135deg, #00BFFF, #008080)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          ← Назад к списку
        </button>

        <Breadcrumbs 
          recipeTitle={title} 
          categoryName={recipeCategory.name} 
          categoryPath={recipeCategory.path} 
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px', background: 'linear-gradient(135deg, #00BFFF, #4682B4)', border: '3px solid #20B2AA', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}>
          
          {/* Заголовок + Мета + Шеринг */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#fff', fontSize: '2.5rem', margin: '0 0 15px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>{title}</h1>
            <ShareButtons title={title} url={canonicalUrl} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '1.1rem', color: '#e0f7fa', marginTop: '15px', flexWrap: 'wrap' }}>
              {epoch && <span style={{ background: 'rgba(0, 191, 255, 0.3)', padding: '8px 15px', borderRadius: '20px', border: '1px solid #00CED1' }}>🕰 {epoch}</span>}
              {time && <span style={{ background: 'rgba(0, 191, 255, 0.3)', padding: '8px 15px', borderRadius: '20px', border: '1px solid #00CED1' }}>⏱ {time}</span>}
            </div>
          </div>

          {/* Фото с исправленными стилями */}
          {image && (
            <div style={{ width: '100%', marginBottom: '30px', borderRadius: '15px', overflow: 'hidden', border: '3px solid #00CED1' }}>
              <img 
                loading="lazy" 
                src={image} 
                alt={title} 
                style={{ 
                  width: '100%', 
                  maxHeight: '400px',
                  objectFit: 'cover',
                  display: 'block' 
                }} 
                onError={e => e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото'} 
              />
            </div>
          )}

          {/* Контент на белом фоне */}
          <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px', padding: '30px', color: '#001f3f' }}>
            
            {/* Ингредиенты */}
            {ingredients.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#006064', fontSize: '1.8rem', marginBottom: '20px', borderBottom: '3px solid #20B2AA', paddingBottom: '10px' }}>📝 Ингредиенты</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
                  {ingredients.map((item, index) => {
                    const text = typeof item === 'string' ? item : `${item.name} — ${item.amount} ${item.unit}`;
                    return (
                      <li key={index} style={{ padding: '12px 15px', background: 'linear-gradient(135deg, #20B2AA, #008080)', borderRadius: '8px', color: '#fff', fontWeight: '500', position: 'relative', paddingLeft: '35px', fontSize: '1.15rem' }}>
                        <span style={{ position: 'absolute', left: '15px', color: '#FFD700', fontWeight: 'bold' }}>✓</span>
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Приготовление */}
            {steps.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#006064', fontSize: '1.8rem', marginBottom: '20px', borderBottom: '3px solid #20B2AA', paddingBottom: '10px' }}>👨‍🍳 Приготовление</h2>
                <ol style={{ counterReset: 'step-counter', listStyle: 'none', padding: 0 }}>
                  {steps.map((step, index) => (
                    <li key={index} style={{ padding: '15px', marginBottom: '12px', background: 'linear-gradient(135deg, #b2ebf2, #80deea)', borderRadius: '8px', color: '#004d40', position: 'relative', paddingLeft: '50px', counterIncrement: 'step-counter', fontSize: '1.15rem', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', background: '#008080', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* История */}
            {history && (
              <div style={{ background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)', padding: '25px', borderRadius: '15px', border: '2px solid #008080', marginBottom: '30px' }}>
                <h2 style={{ color: '#006064', fontSize: '1.8rem', marginBottom: '15px', borderBottom: '3px solid #20B2AA', paddingBottom: '10px' }}>📚 Историческая справка</h2>
                <p style={{ color: '#004d40', fontSize: '1.15rem', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>{history}</p>
              </div>
            )}

            {/* 🙋‍️ ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ */}
            {recipe.faq && (
              <div style={{ marginTop: '20px', padding: '25px', background: '#f0f8ff', borderRadius: '15px', border: '2px solid #20B2AA' }}>
                <h2 style={{ color: '#006064', fontSize: '1.8rem', marginBottom: '20px', borderBottom: '3px solid #20B2AA', paddingBottom: '10px' }}>❓ Часто задаваемые вопросы</h2>
                {recipe.faq.map((item, index) => (
                  <div key={index} style={{ marginBottom: '15px', borderBottom: index === recipe.faq.length - 1 ? 'none' : '1px solid #b2ebf2', paddingBottom: '15px' }}>
                    <h4 style={{ color: '#004d40', fontSize: '1.15rem', marginBottom: '8px', fontWeight: 'bold' }}>❓ {item.question}</h4>
                    <p style={{ color: '#006064', lineHeight: '1.6', margin: 0, fontSize: '1.05rem' }}>💡 {item.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 🍽️ ДРУГИЕ РЕЦЕПТЫ ИЗ ЭТОЙ ЖЕ КАТЕГОРИИ */}
            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '3px solid #FFD700' }}>
              <h2 style={{ color: '#006064', fontSize: '1.8rem', marginBottom: '20px' }}>
                🍽️ Другие рецепты из категории "{recipeCategory.name}"
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {(() => {
                  const otherRecipes = (recipeCategory.data || [])
                    .filter(r => String(r.id) !== String(recipe.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                  
                  return otherRecipes.map(r => (
                    <Link 
                      key={r.id} 
                      to={`/recipe/${r.id}`}
                      style={{ 
                        background: 'linear-gradient(135deg, #FFF8DC, #FFE4B5)', 
                        borderRadius: '12px', 
                        padding: '12px', 
                        textDecoration: 'none',
                        border: '2px solid #FFD700',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      {r.image && (
                        <img 
                          loading="lazy"
                          src={r.image} 
                          alt={r.name || r.title}
                          style={{ 
                            width: '100%', 
                            height: '120px', 
                            objectFit: 'cover', 
                            borderRadius: '8px', 
                            marginBottom: '8px',
                            background: '#eee'
                          }}
                          onError={(e) => { 
                            e.target.src = 'https://via.placeholder.com/300x200?text=Русская+Кухня'; 
                            e.target.style.background = '#eee'; 
                          }}
                        />
                      )}
                      <h4 style={{ color: '#8B0000', fontSize: '1rem', margin: '8px 0 4px 0', lineHeight: '1.3' }}>
                        {r.name || r.title}
                      </h4>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>⏱ {r.time}</span>
                    </Link>
                  ));
                })()}
              </div>
            </div>

          </div> {/* Закрывает белый блок контента */}
        </div> {/* Закрывает основную карточку */}
      </div> {/* Закрывает фон страницы */}
    </>
  );
};

export default RecipePage;