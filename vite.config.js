import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return {
      base: '/onpo-musifo/build/',  // 本番環境のサブディレクトリ
      plugins: [
        laravel({
          input: 'resources/js/app.jsx',
          refresh: false,
        }),
        react(),
      ],
    };
  } else {
    return {
      base: '/',
      plugins: [
        laravel({
          input: 'resources/js/app.jsx',
          refresh: true,
        }),
        react(),
      ],
    };
  }
});
