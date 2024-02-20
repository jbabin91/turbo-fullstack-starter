import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

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
    plugins: [react()],
    server: {
      proxy: {
        '/api/trpc': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/trpc/, '/trpc'),
          target: env.API_URL ?? 'http://localhost:8787',
        },
      },
    },
  };
});
