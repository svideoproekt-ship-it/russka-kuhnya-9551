import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OneSignal from 'react-onesignal';
import { Analytics } from "@vercel/analytics/react";

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BakingCategory from './pages/BakingCategory';
import MeatCategory from './pages/MeatCategory';
import FishCategory from './pages/FishCategory';
import SnacksCategory from './pages/SnacksCategory';
import DessertsCategory from './pages/DessertsCategory';
import DrinksCategory from './pages/DrinksCategory';
import DoughCategory from './pages/DoughCategory';
import Porridge from './pages/Porridge';
import RecipePage from './pages/RecipePage';
import Soups from './pages/Soups';
import KitchenHacks from './pages/KitchenHacks';
import WorldCuisines from './pages/WorldCuisines';
import SeasonalDishes from './pages/SeasonalDishes';

function App() {
  // Инициализация OneSignal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeOneSignal = async () => {
        try {
          await OneSignal.init({
            appId: "140a0eef-2934-46ba-9af6-3ae7bd31dc57",
            allowLocalhostAsSecureOrigin: true,
            serviceWorkerParam: { scope: '/' },
            serviceWorkerPath: '/OneSignalSDKWorker.js',
          });
          console.log('✅ OneSignal инициализирован!');
        } catch (error) {
          console.error('❌ Ошибка инициализации OneSignal:', error);
        }
      };
      
      initializeOneSignal();
    }
  }, []);

  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/baking" element={<BakingCategory />} />
        <Route path="/category/meat" element={<MeatCategory />} />
        <Route path="/category/fish" element={<FishCategory />} />
        <Route path="/category/snacks" element={<SnacksCategory />} />
        <Route path="/category/desserts" element={<DessertsCategory />} />
        <Route path="/category/drinks" element={<DrinksCategory />} />
        <Route path="/category/dough" element={<DoughCategory />} />
        <Route path="/category/porridge" element={<Porridge />} />
        <Route path="/world-cuisines" element={<WorldCuisines />} />
        <Route path="/soups" element={<Soups />} />
        <Route path="/seasonal-dishes" element={<SeasonalDishes />} />
        <Route path="/kitchen-hacks" element={<KitchenHacks />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;