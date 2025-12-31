// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  transformIgnorePatterns: ['/node_modules/'],
};

export default createJestConfig(customJestConfig);
