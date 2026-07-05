import { useEffect } from 'react';

const SEO = ({ 
  title = 'Русская Кухня - Традиционные рецепты с душой',
  description = 'Лучшие рецепты русской кухни: от бабушкиных пирогов до современных блюд. Пошаговые инструкции, лайфхаки и секреты приготовления.',
  keywords = 'русская кухня, рецепты, кулинария, традиционные блюда, русские рецепты',
  url = 'https://russka-kuhnya-9551.vercel.app',
  image = 'https://russka-kuhnya-9551.vercel.app/og-fallback.jpg',
  type = 'website'
}) => {
  useEffect(() => {
    // Основные meta-теги
    document.title = title;
    
    const setMeta = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Базовые meta
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', 'Русская Кухня');
    setMeta('robots', 'index, follow');
    setMeta('language', 'Russian');

    // Open Graph (для соцсетей и мессенджеров)
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:site_name', 'Русская Кухня', 'property');
    setMeta('og:locale', 'ru_RU', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, url, image, type]);

  return null;
};

export default SEO;