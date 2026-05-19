// src/components/CategoryOval.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const CategoryOval = ({ id, name, link, specialClass = '' }) => {
  return (
    <Link to={link} className={`category-oval ${specialClass}`}>
      <span className="category-text">{name}</span>
    </Link>
  );
};

export default CategoryOval;