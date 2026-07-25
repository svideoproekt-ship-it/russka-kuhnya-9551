import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OneSignal from 'react-onesignal';
import { Analytics } from "@vercel/analytics/react";

// HomePage загружается сразу (это главная страница - LCP)
import HomePage from './pages/HomePage';

// Остальные страницы загружаются по требованию (code splitting)
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BakingCategory = lazy(() => import('./pages/BakingCategory'));
const MeatCategory = lazy(() => import('./pages/MeatCategory'));
const FishCategory = lazy(() => import('./pages/FishCategory'));
const SnacksCategory = lazy(() => import('./pages/SnacksCategory'));
const DessertsCategory = lazy(() => import('./pages/DessertsCategory'));
const DrinksCategory = lazy(() => import('./pages/DrinksCategory'));
const DoughCategory = lazy(() => import('./pages/DoughCategory'));
const Porridge = lazy(() => import('./pages/Porridge'));
const RecipePage = lazy(() => import('./pages/RecipePage'));
const Soups = lazy(() => import('./pages/Soups'));
const KitchenHacks = lazy(() => import('./pages/KitchenHacks'));
const WorldCuisines = lazy(() => import('./pages/WorldCuisines'));
const SeasonalDishes = lazy(() => import('./pages/SeasonalDishes'));

// Новые страницы для SEO (E-E-A-T)
const About = lazy(() => import('./pages/About'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Privacy = lazy(() => import('./pages/Privacy'));

// Loader компонент (красивая загрузка)
function Loader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(255,255,255,0.3)',
          borderTop: '5px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p>Загружаем рецепт...</p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function App() {
  // Инициализация OneSignal - отложена до взаимодействия пользователя
  useEffect(() => {
  if (typeof window !== 'undefined') {
    // 1. Регистрируем Vite PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => {
          console.log('✅ Vite PWA SW registered:', reg.scope);
        })
        .catch(err => {
          console.error('❌ Vite PWA SW registration failed:', err);
        });
    }

    // 2. Инициализируем OneSignal
    const initOneSignal = () => {
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
    };

    // Инициализируем через 3 секунды ИЛИ при первом взаимодействии
    const timeout = setTimeout(initOneSignal, 3000);
    
    const handleInteraction = () => {
      clearTimeout(timeout);
      initOneSignal();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }
}, []);

  return (
    <Router>
      <Analytics />
      <Suspense fallback={<Loader />}>
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
          
          {/* Новые страницы для SEO (E-E-A-T) */}
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;