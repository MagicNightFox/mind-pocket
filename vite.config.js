import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["night-fox.tail7f5954.ts.net"], // your existing fix
    proxy: {
      '/api': {
        target: 'http://192.168.244.25:3001',
        changeOrigin: true,
        // This regex strips "/api" off the URL before sending to your backend
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
