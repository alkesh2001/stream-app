import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'https://stream-app-1.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [react()],
})
