import "@testing-library/jest-dom";

// TextEncoder/TextDecoder for Jest environment (needed by react-router-dom)
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder as any;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as any;
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
