import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock Next.js router so redirects don’t break tests
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});
