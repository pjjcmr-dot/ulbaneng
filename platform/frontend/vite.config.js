import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, '../data')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
