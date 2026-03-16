import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("useIsMobile hook", () => {
  afterEach(() => {
    setWindowWidth(1024);
  });

  it("should return false when window.innerWidth >= 768 (desktop)", () => {
    setWindowWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true when window.innerWidth < 768 (mobile)", () => {
    setWindowWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should return false when window.innerWidth is exactly 768 (boundary)", () => {
    setWindowWidth(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true when window.innerWidth is 767 (just below boundary)", () => {
    setWindowWidth(767);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should always return a boolean (never undefined)", () => {
    setWindowWidth(500);
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe("boolean");
  });

  it('should register an addEventListener("change") listener on mount', () => {
    // Capture the mql object the hook creates so we can inspect its mock calls
    let capturedMql: ReturnType<typeof window.matchMedia> | undefined;
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      capturedMql = originalMatchMedia(query);
      return capturedMql;
    });

    renderHook(() => useIsMobile());

    expect(capturedMql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    window.matchMedia = originalMatchMedia;
  });

  it('should call removeEventListener("change") on unmount', () => {
    let capturedMql: ReturnType<typeof window.matchMedia> | undefined;
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      capturedMql = originalMatchMedia(query);
      return capturedMql;
    });

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(capturedMql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    window.matchMedia = originalMatchMedia;
  });

  it("should update isMobile when the onChange handler is invoked", () => {
    setWindowWidth(1024);

    // Capture the mql so we can invoke its registered change handler
    let capturedMql: ReturnType<typeof window.matchMedia> | undefined;
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      capturedMql = originalMatchMedia(query);
      return capturedMql;
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Retrieve the registered handler and fire it after narrowing the viewport
    const calls = (capturedMql.addEventListener as jest.Mock).mock.calls;
    const changeHandler = calls.find((c) => c[0] === "change")?.[1] as
      | (() => void)
      | undefined;

    act(() => {
      setWindowWidth(375);
      changeHandler?.();
    });

    expect(result.current).toBe(true);

    window.matchMedia = originalMatchMedia;
  });
});
