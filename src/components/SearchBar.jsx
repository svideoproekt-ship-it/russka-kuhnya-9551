import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const executeSearch = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Останавливаем всплытие
    }
    
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Прямое добавление обработчиков (в обход React)
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', executeSearch);
      buttonRef.current.addEventListener('touchend', (e) => {
        e.preventDefault();
        executeSearch(e);
      });
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', executeSearch);
        buttonRef.current.removeEventListener('touchend', executeSearch);
      }
    };
  }, [query, navigate]);

  return (
    <form onSubmit={executeSearch} className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      
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

      <button 
        ref={buttonRef}
        type="submit"
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
          minWidth: '48px',
          minHeight: '48px',
          position: 'relative',
          zIndex: 1000,
          pointerEvents: 'auto',
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
          style={{ pointerEvents: 'none' }}
        />
      </button>
    </form>
  );
};

export default SearchBar;