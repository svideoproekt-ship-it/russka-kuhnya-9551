// src/pages/CategoryPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipes from '../data/recipes';
import '../components/SoupsPage.css'; // Используем те же стили, они универсальны

// Словарь для красивых названий категорий
const categoryTitles = {
  soups: "🥣 Супы",
  baking: "🥟 Выпечка",
  meat: "🍖 Мясные блюда",
  fish: "🐟 Рыбные блюда",
  snacks: "🥗 Закуски",
  desserts: "🍯 Десерты",
  drinks: "🍺 Напитки"
};

const CategoryPage = () => {
  const { category } = useParams(); // Получаем "soups", "baking" и т.д. из URL
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Фильтруем рецепты по категории
  const filteredRecipes = recipes.filter(r => r.category === category);
  
  // Получаем красивый заголовок
  const pageTitle = categoryTitles[category] || "Категория";

  const openRecipe = (recipe) => setSelectedRecipe(recipe);
  const closeRecipe = () => setSelectedRecipe(null);

  if (filteredRecipes.length === 0) {
    return (
      <div className="soups-page">
        <h1>В этой категории пока пусто 😔</h1>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  }

  return (
    <div className="soups-page">
      <header className="page-header">
        <h1>{pageTitle}</h1> 
        <p>Найдено рецептов: {filteredRecipes.length}</p>
      </header>  
      
      <div className="cards-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="card-image"
              onClick={() => openRecipe(recipe)}
              style={{ cursor: 'pointer' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Нет+фото'; }}
            />
            <div className="card-content">
              <h3>{recipe.title}</h3>
              <p className="meta-info">
                <span>⏳ {recipe.time}</span>
                <span>📜 {recipe.epoch}</span>
              </p>
              <div className="card-actions">
                <button onClick={() => openRecipe(recipe)}>
                  👁️ Рецепт
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно (такое же, как в SoupsPage) */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeRecipe}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeRecipe}>✕</button>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image" />
            <div className="recipe-details">
              <section>
                <h4>📝 Ингредиенты:</h4>
                <ul>
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing.name} — {ing.amount} {ing.unit}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4>👨‍🍳 Приготовление:</h4>
                <ol>
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>
              <section className="history-block">
                <h4>📚 Историческая справка:</h4>
                <p>{selectedRecipe.history}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;