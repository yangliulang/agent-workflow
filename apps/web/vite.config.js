import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** GitHub Pages 项目站：https://yangliulang.github.io/agent-workflow/ */
const REPO_BASE = '/agent-workflow/';

export default defineConfig(({ mode }) => ({
  // 生产构建走仓库子路径；本地 dev 仍为 /
  base: mode === 'production' ? REPO_BASE : '/',
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
}));
