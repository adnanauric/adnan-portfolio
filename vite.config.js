import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoTags } from './scripts/seo.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'portfolio-seo',
    transformIndexHtml() { return seoTags() },
  }],
  base: '/',
})
