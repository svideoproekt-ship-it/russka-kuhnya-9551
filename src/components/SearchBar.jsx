import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const executeSearch = (e) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={executeSearch} className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      
      {/* 🔥 ПОЛЕ ВВОДА — отдельно, без иконки внутри */}
      <input 
        type="search" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск рецепта..." 
        style={{ 
          flex: 1, 
          padding: '12px 16px', 
          borderRadius: '10px', 
          border: '2px solid #e0e0e0', 
          fontSize: '16px', 
          outline: 'none',
          WebkitAppearance: 'none',
          transition: 'border-color 0.2s',
          background: '#fff'
        }}
        onFocus={(e) => e.target.style.borderColor = '#8B0000'}
        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
      />

      {/* 🔥 КНОПКА С ЛУПОЙ — отдельно, рядом с полем */}
      <button 
        type="submit" 
        onClick={executeSearch}
        onTouchStart={(e) => {
          e.preventDefault();
          executeSearch(e);
        }}
        style={{ 
          background: 'linear-gradient(135deg, #8B0000, #A52A2A)', 
          border: 'none', 
          cursor: 'pointer', 
          padding: '12px 16px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          transition: 'all 0.2s',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          boxShadow: '0 2px 8px rgba(139, 0, 0, 0.3)',
          minWidth: '48px', // Минимальный размер для удобного тапа на мобильном
          minHeight: '48px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #A52A2A, #CD5C5C)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #8B0000, #A52A2A)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Искать"
      >
        <Search 
          size={22} 
          color="#fff" 
          strokeWidth={2.5}
        />
      </button>
    </form>
  );
};

export default SearchBar;