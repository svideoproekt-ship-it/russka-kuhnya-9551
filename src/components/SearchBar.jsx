import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Эта функция сработает И при нажатии Enter на ПК, И при тапе на иконку, И при кнопке "Поиск" на мобильной клавиатуре!
  const handleSearch = (e) => {
    e.preventDefault(); // 🔥 ВАЖНО: предотвращаем стандартную перезагрузку страницы
    
    if (query.trim()) {
      // Перенаправляем на страницу поиска с параметром q (как ожидает твой SearchPage.jsx)
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
      
      {/* 🔥 Превращаем иконку в настоящую кнопку отправки формы */}
      <button 
        type="submit" 
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          padding: '8px', 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: '8px',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 0, 0, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'none'}
        aria-label="Искать"
      >
        <Search size={24} color="#8B0000" />
      </button>
      
      <input 
        type="search" // 🔥 ВАЖНО: открывает на мобильных клавиатуру с кнопкой "Поиск" / "Go"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск рецепта или ингредиента..." 
        style={{ 
          flex: 1, 
          padding: '10px 12px', 
          borderRadius: '8px', 
          border: '1px solid #ccc', 
          fontSize: '16px', // 🔥 ВАЖНО: предотвращает автоматический зум на iPhone при фокусе
          outline: 'none'
        }}
        onFocus={(e) => e.target.style.borderColor = '#8B0000'}
        onBlur={(e) => e.target.style.borderColor = '#ccc'}
      />
    </form>
  );
};

export default SearchBar;