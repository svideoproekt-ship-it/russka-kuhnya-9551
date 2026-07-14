import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Единая функция поиска
  const executeSearch = (e) => {
    // Если событие есть (клик или сабмит), предотвращаем перезагрузку
    if (e) e.preventDefault(); 
    
    if (query.trim()) {
      console.log('🚀 Запуск поиска:', query); // Для отладки в консоли
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={executeSearch} className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
      
      {/* 🔥 КНОПКА С ДВОЙНЫМ ДЕЙСТВИЕМ */}
      <button 
        type="submit" 
        onClick={executeSearch} // <-- ЭТО ГЛАВНОЕ ИСПРАВЛЕНИЕ ДЛЯ МОБИЛЬНЫХ!
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          padding: '10px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          transition: 'background 0.2s',
          WebkitTapHighlightColor: 'transparent' // Убирает синюю подсветку при тапе на Android/iOS
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 0, 0, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'none'}
        aria-label="Искать"
      >
        <Search size={24} color="#8B0000" />
      </button>
      
      <input 
        type="search" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск рецепта..." 
        style={{ 
          flex: 1, 
          padding: '10px 12px', 
          borderRadius: '8px', 
          border: '1px solid #ccc', 
          fontSize: '16px', 
          outline: 'none',
          WebkitAppearance: 'none' // Сбрасывает стандартные стили iOS
        }}
        onFocus={(e) => e.target.style.borderColor = '#8B0000'}
        onBlur={(e) => e.target.style.borderColor = '#ccc'}
      />
    </form>
  );
};

export default SearchBar;