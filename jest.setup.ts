import "@testing-library/jest-dom";
import * as util from "util";

// TextEncoder/TextDecoder polyfill (Jest environment)
if (typeof TextEncoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = util.TextEncoder as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextDecoder = util.TextDecoder as any;
}

// text-encoding polyfill for react-router-dom
if (typeof TextDecoder === "undefined") {
  (global as any).TextDecoder = util.TextDecoder;
}

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
