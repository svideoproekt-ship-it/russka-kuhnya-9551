import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ recipeTitle = null, categoryName = null, categoryPath = null }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  // 🔍 ОТЛАДКА: смотрим что приходит
  console.log('🍞 Breadcrumbs:', {
    location: location.pathname,
    recipeTitle,
    categoryName,
    categoryPath,
    pathnames
  });
  
  if (pathnames.length === 0) return null;

  const pathMap = {
    'baking': 'Выпечка', 'meat': 'Мясо', 'fish': 'Рыба', 'snacks': 'Закуски',
    'desserts': 'Десерты', 'drinks': 'Напитки', 'dough': 'Тесто', 'porridge': 'Каши',
    'soups': 'Супы', 'kitchen-hacks': 'Кухонные хитрости', 'world-cuisines': 'Вкусы мира',
    'seasonal-dishes': 'Блюда сезона', 'about': 'О проекте', 'contacts': 'Контакты',
    'privacy': 'Политика конфиденциальности'
  };

  // Базовые крошки
  let breadcrumbs = [
    { name: 'Главная', path: '/' },
    ...pathnames
      .filter(name => name !== 'category' && name !== 'recipe')
      .map((name) => {
        const path = `/${pathnames.slice(0, pathnames.indexOf(name) + 1).join('/')}`;
        return { name: pathMap[name] || name, path };
      })
  ];

  // Если это страница рецепта и мы передали categoryName и recipeTitle
  if (recipeTitle && categoryName && categoryPath) {
    breadcrumbs = [
      { name: 'Главная', path: '/' },
      { name: categoryName, path: categoryPath },
      { name: recipeTitle, path: null } // null значит не кликабельно
    ];
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path ? `https://russka-kuhnya-9551.vercel.app${item.path}` : undefined
    }))
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <nav style={{ maxWidth: '900px', margin: '20px auto', padding: '0 20px', fontSize: '0.95rem', color: '#B8D4B8' }}>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            {index > 0 && <span style={{ margin: '0 8px', color: '#6BCB77' }}>→</span>}
            {!item.path ? (
              <span style={{ color: '#A8E6CF', fontWeight: '500' }}>{item.name}</span>
            ) : (
              <Link to={item.path} style={{ color: '#6BCB77', textDecoration: 'none' }}
                onMouseOver={e => e.target.style.color = '#A8E6CF'}
                onMouseOut={e => e.target.style.color = '#6BCB77'}>
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;