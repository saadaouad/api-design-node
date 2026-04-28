import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/utils/**/*.test.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['tests/**/*.test.ts'],
          exclude: ['src/utils/**/*.test.ts'],
          globalSetup: ['./tests/globalSetup.ts']
        }
      }
    ]
  },
  plugins: []
});
