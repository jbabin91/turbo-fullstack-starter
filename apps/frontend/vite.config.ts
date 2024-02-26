import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          manualChunks: {
            query: ['@tanstack/react-query'],
            react: ['react', 'react-dom'],
            repo: ['@repo/ui'],
            router: ['@tanstack/react-router'],
            trpc: ['@trpc/client', '@trpc/react-query'],
          },
        },
      },
    },
    plugins: [react(), TanStackRouterVite()],
  };
});
