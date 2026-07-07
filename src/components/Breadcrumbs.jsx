import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Не показывать на главной
  if (pathnames.length === 0) return null;

  // Маппинг путей на названия
  const pathMap = {
    'category': 'Категории',
    'baking': 'Выпечка',
    'meat': 'Мясо',
    'fish': 'Рыба',
    'snacks': 'Закуски',
    'desserts': 'Десерты',
    'drinks': 'Напитки',
    'dough': 'Тесто',
    'porridge': 'Каши',
    'soups': 'Супы',
    'recipe': 'Рецепт',
    'kitchen-hacks': 'Кухонные хитрости',
    'world-cuisines': 'Вкусы мира',
    'seasonal-dishes': 'Блюда сезона',
    'about': 'О проекте',
    'contacts': 'Контакты',
    'privacy': 'Политика конфиденциальности'
  };

  // Построить хлебные крошки
  const breadcrumbs = [
    { name: 'Главная', path: '/' },
    ...pathnames.map((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const displayName = pathMap[name] || name;
      return { name: displayName, path };
    })
  ];

  // Schema разметка BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://russka-kuhnya-9551.vercel.app${item.path}`
    }))
  };

  return (
    <>
      {/* Schema разметка */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* Визуальные хлебные крошки */}
      <nav style={{
        maxWidth: '900px',
        margin: '20px auto',
        padding: '0 20px',
        fontSize: '0.95rem',
        color: '#B8D4B8'
      }}>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            {index > 0 && <span style={{ margin: '0 8px', color: '#6BCB77' }}>→</span>}
            {index === breadcrumbs.length - 1 ? (
              <span style={{ color: '#A8E6CF', fontWeight: '500' }}>{item.name}</span>
            ) : (
              <Link 
                to={item.path} 
                style={{ 
                  color: '#6BCB77', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={e => e.target.style.color = '#A8E6CF'}
                onMouseOut={e => e.target.style.color = '#6BCB77'}
              >
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