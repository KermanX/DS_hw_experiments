/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['./test/*.ts'],
    includeSource: ['./src/*.ts'],
    coverage: {
      provider: 'v8',
      reporter: 'text-summary'
    }
  },
})
