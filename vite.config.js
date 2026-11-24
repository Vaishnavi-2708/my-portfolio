import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: '/my-portfolio/',
  plugins: [react(), tailwindcss()],
  build: mode === 'offline' ? {
    outDir: 'dist-offline',
    rollupOptions: { output: { inlineDynamicImports: true } },
  } : {},
}))
