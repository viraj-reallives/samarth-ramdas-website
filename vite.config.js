import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite does not run Cloudflare Pages Functions. Proxy /api to a target that does:
    // - default: deployed Pages site (works with `npm run dev` alone)
    // - override: VITE_API_PROXY=http://127.0.0.1:8788 when running `npm run dev:api`
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY ?? 'https://samarth-ramdas-website.pages.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
