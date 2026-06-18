import '@testing-library/jest-dom';
import * as util from 'util';

// Type definition for polyfilled globals
interface GlobalWindow extends Window {
  TextEncoder: typeof util.TextEncoder;
  TextDecoder: typeof util.TextDecoder;
}

// TextEncoder/TextDecoder polyfill (Jest environment)
if (typeof (global as unknown as GlobalWindow).TextEncoder === 'undefined') {
  (global as unknown as GlobalWindow).TextEncoder = util.TextEncoder;
  (global as unknown as GlobalWindow).TextDecoder = util.TextDecoder;
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
  if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};
