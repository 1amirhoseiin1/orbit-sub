import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // singlefile inlines JS/CSS straight into index.html on build,
  // so dist/ ends up with one file instead of an assets/ folder.
  // it only kicks in for `vite build`, dev server is unaffected.
  plugins: [react(), viteSingleFile()],
  server: {
    port: 5173
  },
  build: {
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100000000
  }
})
