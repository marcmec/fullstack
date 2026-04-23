import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    globalSetup: './src/test/globalSetup.ts',
    hookTimeout: 60000,
    testTimeout: 30000,
        isolate: true,

  },
})