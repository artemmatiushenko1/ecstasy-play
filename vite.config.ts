import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      shared: ['react', 'react-dom'],
      remotes: {
        'connectTiles': 'http://localhost:3001/assets/remoteEntry.js',
        'snake': 'http://localhost:3002/assets/remoteEntry.js',
        'tetris': 'http://localhost:3003/assets/remoteEntry.js',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
