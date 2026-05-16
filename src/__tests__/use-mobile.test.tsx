import { renderHook } from "@testing-library/react";
import useIsMobile from "../hooks/use-mobile";

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
global.matchMedia = mockMatchMedia;

describe("useIsMobile Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined as a hook function", () => {
    expect(typeof useIsMobile).toBe("function");
  });

  it("should accept calls without errors", () => {
    expect(() => {
      renderHook(() => useIsMobile());
    }).not.toThrow();
  });
});
