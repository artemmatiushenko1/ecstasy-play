import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'snake-app',
      filename: 'remoteEntry.js',
      exposes: {
        './app': './src/main.js',
      },
    }),
  ],
  build: { target: 'esnext' },
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  },
});
