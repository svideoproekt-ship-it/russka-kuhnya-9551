import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import sitemap from 'vite-plugin-sitemap'  // ← ДОБАВИЛИ ИМПОРТ

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Русская Кухня',
        short_name: 'РусКухня',
        description: 'Традиционные русские рецепты с историей',
        theme_color: '#E85D4E',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    }),
    sitemap({  // ← ДОБАВИЛИ ПЛАГИН
      hostname: 'https://russka-kuhnya-9551.vercel.app',
      dynamicRoutes: [],
      exclude: [],
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString().split('T')[0],
    }),
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})