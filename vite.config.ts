import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number.parseInt(process.env.PORT || '8443', 10),
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: Number.parseInt(process.env.PORT || '8443', 10),
  },
})
