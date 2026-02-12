import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss({
      // optimize: {
      //   minify: true
      // }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
