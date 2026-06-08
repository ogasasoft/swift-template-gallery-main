import '@testing-library/jest-dom';

// TextEncoder polyfill for react-router-dom
if (typeof TextEncoder === 'undefined') {
  // @ts-expect-error - Node.js util module is not available in browser environment
  const { TextEncoder: TextEncoderImpl } = require('util');
  (global as NodeJS.Global).TextEncoder = TextEncoderImpl;
}

// Mock window.matchMedia using jest.fn
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Silence the React Router warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  originalWarn(...args);
};
