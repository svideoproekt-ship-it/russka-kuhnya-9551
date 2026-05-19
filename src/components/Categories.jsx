// src/components/Categories.jsx
import React from 'react';
import CategoryOval from './CategoryOval';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Супы', icon: '🍲', link: '/category/soups' },
    { id: 2, name: 'Выпечка', icon: '🥟', link: '/category/baking' },
    { id: 3, name: 'Мясные блюда', icon: '🥩', link: '/category/meat' },
    { id: 4, name: 'Рыбные блюда', icon: '🐟', link: '/category/fish' },
    { id: 5, name: 'Закуски', icon: '🥗', link: '/category/snacks' },
    { id: 6, name: 'Десерты', icon: '🍰', link: '/category/desserts' },
    { id: 7, name: 'Напитки', icon: '🍺', link: '/category/drinks' },
    { id: 8, name: 'Тесто', icon: '🥖', link: '/category/dough' },
  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <a key={category.id} href={category.link} className="category-oval">
          <span className="category-icon">{category.icon}</span>
          <span className="category-text">{category.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Categories;