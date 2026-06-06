// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SoupCategory from './pages/SoupCategory';
import BakingCategory from './pages/BakingCategory';
import MeatCategory from './pages/MeatCategory';
import FishCategory from './pages/FishCategory';
import SnacksCategory from './pages/SnacksCategory';
import DessertsCategory from './pages/DessertsCategory';
import DrinksCategory from './pages/DrinksCategory';
import DoughCategory from './pages/DoughCategory';
import Porridge from './pages/Porridge';
import RecipePage from './pages/RecipePage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/soups" element={<SoupCategory />} />
        <Route path="/category/baking" element={<BakingCategory />} />
        <Route path="/category/meat" element={<MeatCategory />} />
        <Route path="/category/fish" element={<FishCategory />} />
        <Route path="/category/snacks" element={<SnacksCategory />} />
        <Route path="/category/desserts" element={<DessertsCategory />} />
        <Route path="/category/drinks" element={<DrinksCategory />} />
        <Route path="/category/dough" element={<DoughCategory />} />
        <Route path="/category/porridge" element={<Porridge />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;