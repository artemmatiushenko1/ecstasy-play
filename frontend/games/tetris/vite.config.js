import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'tetris-app',
      filename: 'remoteEntry.js',
      exposes: {
        './app': './src/js/main.js',
      },
    }),
  ],
  build: { target: 'esnext' },
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
  },
});
