import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TheCodexa/',   // 🔴 REQUIRED for GitHub Pages
  plugins: [react()],
  base: '/TheCodexa/',
})
