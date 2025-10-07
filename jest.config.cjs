// jest.config.js

// Import the official Next.js Jest integration (built-in with "next", not "@next/jest")
const nextJest = require('next/jest');

// Create a Jest config function with the root directory of your project
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  // Simulate a browser environment (needed for React components)
  testEnvironment: 'jsdom',

  // Run this file before tests (to add things like jest-dom matchers)
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

  // Module name mappings to help Jest understand paths and imports
  moduleNameMapper: {
    // So we can use "@/" instead of relative paths like "../"
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mock CSS imports so Jest doesn’t crash when encountering styles
    '\\.(css|scss)$': '<rootDir>/tests/styleMock.js',
  },

  // Ignore build and dependency folders when running tests
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

// Export the config wrapped with Next.js settings
module.exports = createJestConfig(customJestConfig);
