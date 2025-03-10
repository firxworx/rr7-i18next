import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouterHonoServer({
      runtime: 'node',
      serverEntryPoint: 'app/server/index.ts',
      dev: {
        export: 'default',
        // exclude: [...],
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  // resolution for issue similar to https://github.com/vitejs/vite/issues/6985
  optimizeDeps: {
    include: ['i18next-fs-backend'],
    esbuildOptions: {
      supported: {
        'top-level-await': true,
      },
    },
  },
})
