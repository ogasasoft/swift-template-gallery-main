import { renderHook } from "@testing-library/react";

// Direct import to avoid module resolution issues
import * as useMobileModule from "../hooks/use-mobile";

describe("useIsMobile Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined as a hook function", () => {
    expect(typeof useMobileModule.useIsMobile).toBe("function");
  });

  it("should accept calls without errors", () => {
    expect(() => {
      renderHook(() => useMobileModule.useIsMobile());
    }).not.toThrow();
  });
});
