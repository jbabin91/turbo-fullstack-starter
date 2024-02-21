import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log('API URL:', env.API_URL);

  return {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          manualChunks: {
            react: ['react', 'react-dom'],
            repo: ['@repo/ui'],
          },
        },
      },
    },
    define: {
      API_URL: JSON.stringify(env.API_URL),
    },
    plugins: [react()],
    server: {
      proxy: {
        '/trpc': {
          changeOrigin: true,
          target: env.API_URL ?? 'http://localhost:8787',
        },
      },
    },
  };
});
