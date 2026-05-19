import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipePage.css';

const BakingPage = () => {
  const navigate = useNavigate();

  const recipes = [
    // Все 15 рецептов (как в предыдущих ответах)
  ];

  return (
    <div className="baking-page-container">
      <div className="recipe-header">
        <h1 className="page-title">🥟 Выпечка</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="main-image" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Нет+фото'; }}
            />
            
            <h2 className="recipe-title">{recipe.title}</h2>
            
            <div className="recipe-meta">
              <span>🕰 {recipe.time}</span>
              <span>📜 {recipe.era}</span>
            </div>

            <div className="ingredients-list">
              <h4>Ингредиенты:</h4>
              <ul>
                {recipe.ingredients.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="instructions">
              <h4>Приготовление:</h4>
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="history-note">
              <strong>Историческая справка:</strong> {recipe.history}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BakingPage;