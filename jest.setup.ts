import '@testing-library/jest-dom';

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

// Mock TextEncoder for Node.js environment
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = class TextEncoder {
    constructor() {
      this.encoding = 'utf-8';
    }
    encode(input?: Uint8Array | string): Uint8Array {
      if (input instanceof Uint8Array) {
        return input;
      }
      const encoder = new TextEncoder();
      return encoder.encode(input || '');
    }
  };
}

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
