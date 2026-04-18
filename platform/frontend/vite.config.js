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
      '@data': path.resolve(__dirname, './src/data')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          // React·Router (항상 필요) — 작게 유지
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Recharts (TrendPage 전용·큰 용량) — 별도 청크
          'vendor-charts': ['recharts'],
          // 데이터 — 초기 로드에 필요하지만 별도 청크로 분리하여 캐싱 효율↑
          'data-questions': ['@data/questions.json', '@data/analysis.json'],
          'data-answers-summary': ['@data/answers-summary.json'],
          'data-answers-detailed': ['@data/answers-detailed.json']
        }
      }
    }
  }
});
