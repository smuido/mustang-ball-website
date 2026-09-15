import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project at https://<user>.github.io/mustang-ball-website/,
  // not the domain root, so every built asset path needs this prefix.
  base: '/mustang-ball-website/',
})
