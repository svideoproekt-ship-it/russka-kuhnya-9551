import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import prerender from 'vite-plugin-prerender'

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
    prerender({
      routes: [
        '/',
        '/recipe/1',
        '/recipe/2',
        '/recipe/3',
        '/recipe/4',
        '/recipe/5',
        '/recipe/6',
        '/recipe/7',
        '/recipe/8',
        '/recipe/9',
        '/recipe/10',
      ],
      postProcess: (context) => {
        context.route = context.route.replace(/\/$/, '')
      }
    })
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})