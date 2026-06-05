import fs from 'fs';
import path from 'path';

// Импортируем все данные рецептов
import { soupsData } from './src/data/soupsData.js';
import { bakingData } from './src/data/bakingData.js';
import { meatData } from './src/data/meatData.js';
import { fishData } from './src/data/fishData.js';
import { snacksData } from './src/data/snacksData.js';
import { dessertsData } from './src/data/dessertsData.js';
import { drinksData } from './src/data/drinksData.js';
import { doughData } from './src/data/doughData.js';

const BASE_URL = 'https://russka-kuhnya-9551.vercel.app';

// Объединяем все рецепты
const allRecipes = [
  ...soupsData,
  ...bakingData,
  ...meatData,
  ...fishData,
  ...snacksData,
  ...dessertsData,
  ...drinksData,
  ...doughData
];

// Генерируем sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Главная страница
sitemap += `  <url>\n`;
sitemap += `    <loc>${BASE_URL}/</loc>\n`;
sitemap += `    <changefreq>weekly</changefreq>\n`;
sitemap += `    <priority>1.0</priority>\n`;
sitemap += `  </url>\n`;

// Все рецепты
allRecipes.forEach(recipe => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${BASE_URL}/recipe/${recipe.id}</loc>\n`;
  sitemap += `    <changefreq>monthly</changefreq>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>\n`;

// Сохраняем ТОЛЬКО в public/sitemap.xml
fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml сохранён в public/');
// Копируем в api папку для Vercel Edge Function
if (fs.existsSync('api')) {
  // API endpoint уже создан
}
console.log(`✅ Sitemap.xml сгенерирован! Всего рецептов: ${allRecipes.length}`);