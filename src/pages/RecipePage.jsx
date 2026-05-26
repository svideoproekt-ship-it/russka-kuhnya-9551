// src/pages/RecipePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { soupsData } from '../data/soupsData';
import ShareButtons from '../components/ShareButtons';
import '../styles/RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  
  // Для отладки
  console.log('=== RecipePage ===');
  console.log('ID из URL:', id);
  console.log('ID как число:', parseInt(id));
  
  // Ищем рецепт по числовому id
  const recipe = soupsData.find(r => {
    console.log(`Сравниваем: ${r.id} === ${parseInt(id)} ? ${r.id === parseInt(id)}`);
    return r.id === parseInt(id);
  });
  
  console.log('Найденный рецепт:', recipe);
  console.log('Ингредиенты:', recipe?.ingredients);

  if (!recipe) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>😔 Рецепт не найден</h1>
        <p>ID: {id}</p>
        <Link to="/category/soups" style={{ color: '#008080' }}>
          ← Вернуться к супам
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-page" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <button 
        onClick={() => window.history.back()} 
        style={{ 
          padding: '12px 24px', 
          margin: '20px',
          background: '#008080',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Назад к списку
      </button>
      
      <div className="recipe-container" style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>{recipe.name}</h1>
        
        <ShareButtons 
          title={recipe.name}
          url={`${window.location.origin}/recipe/${recipe.id}`}
        />
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          margin: '20px 0', 
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>🕰 <strong>{recipe.epoch}</strong></span>
          <span style={{ fontSize: '16px' }}>⏱ <strong>{recipe.time}</strong></span>
        </div>

        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            style={{ 
              width: '100%', 
              maxHeight: '500px', 
              objectFit: 'cover', 
              borderRadius: '12px',
              marginBottom: '30px'
            }}
            onError={(e) => {
              console.log('Ошибка загрузки изображения');
              e.target.src = 'https://via.placeholder.com/800x400?text=Нет+фото';
            }}
          />
        )}

        {/* Ингредиенты */}
        <div style={{ margin: '30px 0' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #008080', paddingBottom: '10px' }}>
            📝 Ингредиенты
          </h2>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '10px'
          }}>
            {recipe.ingredients && recipe.ingredients.map((item, index) => {
              console.log(`Ингредиент ${index}:`, item);
              return (
                <li 
                  key={index}
                  style={{ 
                    padding: '10px 15px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    borderLeft: '3px solid #008080'
                  }}
                >
                  {typeof item === 'string' 
                    ? item 
                    : `${item.name} — ${item.amount} ${item.unit}`
                  }
                </li>
              );
            })}
          </ul>
        </div>

        {/* Приготовление */}
        <div style={{ margin: '30px 0' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #008080', paddingBottom: '10px' }}>
            👨‍ Приготовление
          </h2>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            {recipe.preparation && recipe.preparation.map((step, index) => (
              <li 
                key={index}
                style={{ 
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Историческая справка */}
        {recipe.history && (
          <div style={{ 
            margin: '30px 0', 
            padding: '25px', 
            background: '#fff8e1',
            borderRadius: '12px',
            borderLeft: '5px solid #ff9800'
          }}>
            <h2 style={{ color: '#2c3e50', marginTop: 0 }}>📚 Историческая справка</h2>
            <p style={{ lineHeight: '1.8', color: '#555', fontSize: '16px' }}>{recipe.history}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;