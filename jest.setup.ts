import "@testing-library/jest-dom";

// Mock TextEncoder and TextDecoder for jsdom environment
if (!window.TextEncoder) {
  window.TextEncoder = class TextEncoder {
    encoding = "utf-8";
    constructor() {}
    encode(input?: string): Uint8Array {
      return new TextEncoder().encode(input);
    }
    encodeInto(
      input: string,
      dest: Uint8Array,
    ): { read: number; written: number } {
      return { read: input.length, written: dest.length };
    }
  };
}

if (!window.TextDecoder) {
  window.TextDecoder = class TextDecoder {
    encoding = "utf-8";
    constructor() {}
    decode(input?: Uint8Array): string {
      return new TextDecoder().decode(input);
    }
    decodeInto(
      input: Uint8Array,
      dest: Uint8Array,
    ): { read: number; written: number } {
      return { read: input.length, written: dest.length };
    }
  };
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
