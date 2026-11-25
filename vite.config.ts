import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const workerConfig = JSON.parse(readFileSync(path.join(projectRoot, 'wrangler.jsonc'), 'utf8')) as {
  vars?: Record<string, string>
}

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, projectRoot, 'VITE_')
  const buildEnv = {
    VITE_SANITY_PROJECT_ID: localEnv.VITE_SANITY_PROJECT_ID || workerConfig.vars?.VITE_SANITY_PROJECT_ID,
    VITE_SANITY_DATASET: localEnv.VITE_SANITY_DATASET || workerConfig.vars?.VITE_SANITY_DATASET,
  }

  return {
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_SANITY_PROJECT_ID': JSON.stringify(buildEnv.VITE_SANITY_PROJECT_ID),
    'import.meta.env.VITE_SANITY_DATASET': JSON.stringify(buildEnv.VITE_SANITY_DATASET),
  },
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number.parseInt(process.env.PORT || '8443', 10),
    strictPort: true,
    proxy: {
      '/api/translate': 'http://127.0.0.1:8787',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: Number.parseInt(process.env.PORT || '8443', 10),
  },
  }
})
