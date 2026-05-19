import React from 'react';
import { Search } from 'lucide-react'; // Иконка лупы

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <Search size={20} color="#8B0000" />
      <input 
        type="text" 
        placeholder="Поиск рецепта или ингредиента..." 
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;