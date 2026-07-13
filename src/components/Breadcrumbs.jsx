import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = ({ recipeTitle = null, categoryName = null, categoryPath = null }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // На главной странице хлебные крошки не нужны
  if (pathnames.length === 0) return null;

  // Словарь для перевода URL-сегментов в красивые русские названия
  const pathNames = {
    soups: 'Супы',
    baking: 'Выпечка',
    meat: 'Мясные блюда',
    fish: 'Рыбные блюда',
    snacks: 'Закуски',
    desserts: 'Десерты',
    drinks: 'Напитки',
    dough: 'Тесто',
    porridge: 'Каши',
    'world-cuisines': 'Вкусы мира',
    'seasonal-dishes': 'Блюда сезона',
    'kitchen-hacks': 'Кухонные лайфхаки',
    search: 'Поиск',
    about: 'О проекте',
    contacts: 'Контакты',
    privacy: 'Конфиденциальность',
  };

  // Формируем массив данных для хлебных крошек
  const breadcrumbs = [{ name: 'Главная', path: '/' }];

  let currentPath = '';
  pathnames.forEach((value, index) => {
    currentPath += `/${value}`;
    
    // Пропускаем слово "category" в URL, чтобы не было "Главная > Категория > Супы"
    if (value === 'category') return;

    // Если это последний элемент и нам передали название рецепта, используем его
    if (index === pathnames.length - 1 && recipeTitle) {
      breadcrumbs.push({ name: recipeTitle, path: currentPath, isLast: true });
    } else {
      // Иначе берем название из словаря или из пропса categoryName
      const name = pathNames[value] || categoryName || value;
      const isLast = index === pathnames.length - 1;
      breadcrumbs.push({ name, path: currentPath, isLast });
    }
  });

  // Формируем JSON-LD разметку для Schema.org (для Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://russka-kuhnya-9551.vercel.app${crumb.path}`
    }))
  };

  return (
    <>
      {/* Скрытая разметка для поисковых роботов */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Визуальные хлебные крошки для пользователей */}
      <nav aria-label="Хлебные крошки" style={{ marginBottom: '20px', fontSize: '0.95rem', color: '#666' }}>
        <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && <span style={{ margin: '0 8px', color: '#999' }}>/</span>}
              
              {crumb.isLast ? (
                // Последний элемент — просто текст, не ссылка
                <span style={{ color: '#8B0000', fontWeight: 'bold' }}>
                  {crumb.name}
                </span>
              ) : (
                // Все предыдущие элементы — кликабельные ссылки
                <Link 
                  to={crumb.path} 
                  style={{ color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.target.style.color = '#8B0000'}
                  onMouseOut={(e) => e.target.style.color = '#555'}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;