import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // O Three.js (efeito do hero) vira um arquivo separado de ~740 KB, carregado só depois da página.
  build: { chunkSizeWarningLimit: 800 },
})
