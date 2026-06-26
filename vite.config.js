import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — чтобы сайт работал и из подпапки (GitHub Pages), и локально
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5174, strictPort: true },
});
