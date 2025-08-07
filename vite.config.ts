import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: './public',
  define: {
    global: 'globalThis'
  },
  build: {
    rollupOptions: {
      // Ensure compatibility with Node.js environments
      external: []
    }
  }
})
