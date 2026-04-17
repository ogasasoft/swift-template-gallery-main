import "@testing-library/jest-dom";

// TextEncoder polyfill for Node.js environments
// Must be set in a beforeEach hook to work with jest-environment-jsdom
global.TextEncoder =
  (globalThis as any).TextEncoder ||
  (() => {
    throw new Error("TextEncoder is not available");
  });

// Mock TextEncoder for react-router-dom
global.TextEncoder = class TextEncoder {
  encode(input: string | Uint8Array): Uint8Array {
    if (typeof input === "string") {
      const encoder = new TextEncoder();
      return encoder.encode(input);
    }
    return input as Uint8Array;
  }
  encodeInto(
    input: string | Uint8Array,
    output: Uint8Array,
  ): { written: number; read: number } {
    if (typeof input === "string") {
      const encoder = new TextEncoder();
      return encoder.encodeInto(input, output);
    }
    return { written: 0, read: 0 };
  }
};

// Mock window.matchMedia using jest.fn
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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
    typeof args[0] === "string" &&
    args[0].includes("React Router Future Flag Warning")
  ) {
    return;
  }
  originalWarn(...args);
};
