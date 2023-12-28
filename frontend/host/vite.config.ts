import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = process.cwd();
  const env = { ...process.env, ...loadEnv(mode, envDir) };

  return {
    plugins: [
      react(),
      federation({
        name: 'host-app',
        shared: ['react', 'react-dom'],
        remotes: {
          'connectTiles': `${env.VITE_CONNECT_TILES_HOST}/assets/remoteEntry.js`,
          'snake': `${env.VITE_SNAKE_HOST}/assets/remoteEntry.js`,
          'tetris': `${env.VITE_TETRIS_HOST}/assets/remoteEntry.js`,
        },
      }),
    ],
    build: { target: 'esnext' },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
