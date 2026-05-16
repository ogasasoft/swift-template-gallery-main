import "@testing-library/jest-dom";

// Mock TextEncoder for React Router v7
Object.defineProperty(global, "TextEncoder", {
  writable: true,
  value: class TextEncoder {
    encoding = "utf-8";
    encode(input?: string): Uint8Array {
      return new TextEncoder().encode(input);
    }
  },
});

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
