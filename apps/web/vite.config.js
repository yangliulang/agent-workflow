import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    port: 5173,
  },
});
