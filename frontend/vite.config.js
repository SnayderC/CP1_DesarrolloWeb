import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Siempre en 5173 (el origen que permite el CORS del backend).
  // Si el puerto está ocupado, Vite avisa en lugar de cambiar a otro.
  server: { port: 5173, strictPort: true },
})
