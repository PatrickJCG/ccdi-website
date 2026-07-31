import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion'))   return 'vendor-motion';
            if (id.includes('lucide-react'))    return 'vendor-icons';
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('react/')
            )                                   return 'vendor-react';
          }
        },
      },
    },
  },
})


