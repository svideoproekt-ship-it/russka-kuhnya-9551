import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://russka-kuhnya-9551.vercel.app';

// Простой способ: генерируем sitemap для ID от 1 до 130
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Главная страница
sitemap += `  <url>\n`;
sitemap += `    <loc>${BASE_URL}/</loc>\n`;
sitemap += `    <changefreq>weekly</changefreq>\n`;
sitemap += `    <priority>1.0</priority>\n`;
sitemap += `  </url>\n`;

// Все рецепты (от 1 до 130)
for (let i = 1; i <= 130; i++) {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${BASE_URL}/recipe/${i}</loc>\n`;
  sitemap += `    <changefreq>monthly</changefreq>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
}

sitemap += `</urlset>\n`;

// Сохраняем в public/sitemap.xml
fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap, 'utf8');
console.log(`✅ sitemap.xml сгенерирован! Всего URL: 130 (главная + 130 рецептов)`);