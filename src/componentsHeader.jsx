import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <BookOpen size={24} color="#8B0000" />
          <span>Русская Кухня</span>
        </Link>
        <nav>
          <Link to="/favorites" className="nav-link">
            <Heart size={20} />
            <span>Избранное</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;