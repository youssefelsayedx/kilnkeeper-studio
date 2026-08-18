/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()], // @ts-expect-error Vitest adds the test key to Vite's config type.
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], css: true, globals: true, fileParallelism: false, pool: 'forks' } })
