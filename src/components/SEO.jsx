import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Русская Кухня - Традиционные рецепты с душой',
  description = 'Лучшие рецепты русской кухни: от бабушкиных пирогов до современных блюд. Пошаговые инструкции, лайфхаки и секреты приготовления.',
  keywords = 'русская кухня, рецепты, кулинария, традиционные блюда, русские рецепты',
  url = 'https://russka-kuhnya-9551.vercel.app', // Дефолт только для главной
  image = 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Основные теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Русская Кухня" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Russian" />
      
      {/* Open Graph (для красивых ссылок в Telegram, VK, WhatsApp) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Русская Кухня" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* 🔥 САМОЕ ВАЖНОЕ: Canonical URL для Яндекса и Google */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;