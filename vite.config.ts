import { defineConfig } from 'vite'

import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  // uncomment for debugging only
  // do not use in production (sourcemaps can make all code visible to public)
  // build: {
  //   minify: false,
  //   sourcemap: true,
  // },
  server: {
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*.tsx'],
      ssrFiles: ['./app/server/index.ts', './app/entry.server.tsx', './app/routes/**/*.tsx'],
    },
  },
  plugins: [
    tailwindcss(),
    cloudflare({
      viteEnvironment: {
        name: 'ssr',
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  // resolution for issue similar to https://github.com/vitejs/vite/issues/6985
  optimizeDeps: {
    include: ['i18next-fs-backend'],
    exclude: ['@opentelemetry/*'],
    esbuildOptions: {
      supported: {
        'top-level-await': true,
      },
    },
  },
})
