import {} from "react";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
	const mql = {
		matches,
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	};
	(window as unknown as { matchMedia: jest.Mock }).matchMedia = jest
		.fn()
		.mockImplementation(() => mql);
	return mql;
};

describe("useIsMobile Hook", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Reset to default mobile breakpoint (mobile)
		mockMatchMedia(true);
	});

	describe("Initial State", () => {
		it("should return false when screen width is >= 768px", () => {
			const mql = mockMatchMedia(false);
			const { result } = renderHook(() => useIsMobile());

			// Effect sets initial state based on matches
			expect(mql.matches).toBe(false);
			expect(result.current).toBe(false);
		});

		it("should return true when screen width is < 768px", () => {
			const mql = mockMatchMedia(true);
			const { result } = renderHook(() => useIsMobile());

			// Effect sets initial state based on matches
			expect(mql.matches).toBe(true);
			expect(result.current).toBe(true);
		});
	});

	describe("Resize Events", () => {
		it("should update isMobile when window is resized below mobile breakpoint", () => {
			const mql = mockMatchMedia(false); // Start as desktop
			const { result } = renderHook(() => useIsMobile());

			expect(result.current).toBe(false);

			// Simulate resize to mobile
			act(() => {
				mql.matches = true;
				(mql.addEventListener as jest.Mock).mock.calls[0][1]();
			});

			// The change listener should update the state
			expect(result.current).toBe(true);
		});

		it("should update isMobile when window is resized above mobile breakpoint", () => {
			const mql = mockMatchMedia(true); // Start as mobile
			const { result } = renderHook(() => useIsMobile());

			expect(result.current).toBe(true);

			// Simulate resize to desktop
			act(() => {
				mql.matches = false;
				const listener = (mql.addEventListener as jest.Mock).mock.calls[0][1];
				listener();
			});

			// The change listener should update the state
			expect(result.current).toBe(false);
		});
	});

	describe("Media Query Listener", () => {
		it("should add event listener on mount", () => {
			mockMatchMedia(true);

			renderHook(() => useIsMobile());

			const mql = (window as unknown as { matchMedia: jest.Mock }).matchMedia(
				true,
			);
			expect(mql.addEventListener).toHaveBeenCalledWith(
				"change",
				expect.any(Function),
			);
		});

		it("should remove event listener on unmount", () => {
			mockMatchMedia(true);

			const { unmount } = renderHook(() => useIsMobile());

			const mql = (window as unknown as { matchMedia: jest.Mock }).matchMedia(
				true,
			);
			expect(mql.addEventListener).toHaveBeenCalledWith(
				"change",
				expect.any(Function),
			);

			unmount();

			expect(mql.removeEventListener).toHaveBeenCalledWith(
				"change",
				expect.any(Function),
			);
		});
	});

	describe("Edge Cases", () => {
		it("should handle window.innerWidth exactly at mobile breakpoint", () => {
			const mql = mockMatchMedia(true);
			mql.matches = false; // 768px is not less than 768px

			// Create hook instance
			const { result } = renderHook(() => useIsMobile());

			// Effect checks window.innerWidth < 768px, so false
			expect(result.current).toBe(false);
		});

		it("should handle very small screen widths", () => {
			// Set window.innerWidth to a small value
			(window as unknown as { innerWidth: number }).innerWidth = 375;

			const mql = mockMatchMedia(true);
			mql.matches = true;

			// Create hook instance
			const { result } = renderHook(() => useIsMobile());

			// Effect checks window.innerWidth < 768px, so true
			expect(result.current).toBe(true);
		});

		it("should handle very large screen widths", () => {
			// Set window.innerWidth to a large value
			(window as unknown as { innerWidth: number }).innerWidth = 3840;

			const mql = mockMatchMedia(false);
			mql.matches = false;

			// Create hook instance
			const { result } = renderHook(() => useIsMobile());

			// Effect checks window.innerWidth < 768px, so false
			expect(result.current).toBe(false);
		});
	});
});
