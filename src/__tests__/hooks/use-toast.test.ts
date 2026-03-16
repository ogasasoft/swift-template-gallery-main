import { renderHook, act } from "@testing-library/react";
import { reducer, actionTypes, useToast, toast } from "@/hooks/use-toast";

// ─── Pure reducer tests ───────────────────────────────────────────────────────

const makeToast = (id: string, title = "Test Toast") => ({
  id,
  title,
  open: true,
  onOpenChange: jest.fn(),
});

describe("use-toast reducer", () => {
  it("ADD_TOAST adds a toast to empty state", () => {
    const state = reducer(
      { toasts: [] },
      { type: actionTypes.ADD_TOAST, toast: makeToast("1") },
    );
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("1");
    expect(state.toasts[0].title).toBe("Test Toast");
  });

  it("ADD_TOAST respects TOAST_LIMIT of 1 (new toast replaces old)", () => {
    const withOne = reducer(
      { toasts: [] },
      { type: actionTypes.ADD_TOAST, toast: makeToast("existing") },
    );
    const withTwo = reducer(withOne, {
      type: actionTypes.ADD_TOAST,
      toast: makeToast("new"),
    });
    expect(withTwo.toasts).toHaveLength(1);
    expect(withTwo.toasts[0].id).toBe("new");
  });

  it("UPDATE_TOAST updates the matching toast", () => {
    const initial = { toasts: [makeToast("1", "Original")] };
    const state = reducer(initial, {
      type: actionTypes.UPDATE_TOAST,
      toast: { id: "1", title: "Updated" },
    });
    expect(state.toasts[0].title).toBe("Updated");
  });

  it("UPDATE_TOAST leaves non-matching toasts unchanged", () => {
    const initial = { toasts: [makeToast("1", "Original")] };
    const state = reducer(initial, {
      type: actionTypes.UPDATE_TOAST,
      toast: { id: "other", title: "Updated" },
    });
    expect(state.toasts[0].title).toBe("Original");
  });

  it("DISMISS_TOAST with toastId sets open to false for that toast", () => {
    const initial = { toasts: [makeToast("1")] };
    const state = reducer(initial, {
      type: actionTypes.DISMISS_TOAST,
      toastId: "1",
    });
    expect(state.toasts[0].open).toBe(false);
  });

  it("DISMISS_TOAST without toastId dismisses all toasts", () => {
    const initial = {
      toasts: [
        { ...makeToast("1"), open: true },
        { ...makeToast("2"), open: true },
      ],
    };
    const state = reducer(initial, { type: actionTypes.DISMISS_TOAST });
    expect(state.toasts.every((t) => t.open === false)).toBe(true);
  });

  it("DISMISS_TOAST only affects the specified toast", () => {
    const initial = {
      toasts: [
        { ...makeToast("1"), open: true },
        { ...makeToast("2"), open: true },
      ],
    };
    const state = reducer(initial, {
      type: actionTypes.DISMISS_TOAST,
      toastId: "1",
    });
    expect(state.toasts.find((t) => t.id === "1")?.open).toBe(false);
    expect(state.toasts.find((t) => t.id === "2")?.open).toBe(true);
  });

  it("REMOVE_TOAST with toastId removes that specific toast", () => {
    const initial = {
      toasts: [makeToast("1"), makeToast("2")],
    };
    const state = reducer(initial, {
      type: actionTypes.REMOVE_TOAST,
      toastId: "1",
    });
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("2");
  });

  it("REMOVE_TOAST without toastId removes all toasts", () => {
    const initial = { toasts: [makeToast("1"), makeToast("2")] };
    const state = reducer(initial, { type: actionTypes.REMOVE_TOAST });
    expect(state.toasts).toHaveLength(0);
  });
});

// ─── useToast hook tests ──────────────────────────────────────────────────────

describe("useToast hook", () => {
  it("returns toast function", () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.toast).toBe("function");
  });

  it("returns dismiss function", () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.dismiss).toBe("function");
  });

  it("returns toasts array", () => {
    const { result } = renderHook(() => useToast());
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it("adds a toast with the correct title", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Hello from test" });
    });
    // TOAST_LIMIT=1 means the last toast added is always the current one
    expect(result.current.toasts[0].title).toBe("Hello from test");
  });

  it("dismiss sets the toast to closed", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;
    act(() => {
      const t = result.current.toast({ title: "Dismiss me" });
      toastId = t.id;
    });
    act(() => {
      result.current.dismiss(toastId);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("dismiss without id dismisses all toasts", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Toast A" });
    });
    act(() => {
      result.current.dismiss();
    });
    expect(result.current.toasts.every((t) => !t.open)).toBe(true);
  });
});

// ─── toast function tests ─────────────────────────────────────────────────────

describe("toast function", () => {
  it("returns an id string", () => {
    const result = toast({ title: "Test" });
    expect(typeof result.id).toBe("string");
  });

  it("returns a dismiss function", () => {
    const result = toast({ title: "Test" });
    expect(typeof result.dismiss).toBe("function");
  });

  it("returns an update function", () => {
    const result = toast({ title: "Test" });
    expect(typeof result.update).toBe("function");
  });

  it("generates unique ids for each toast call", () => {
    const t1 = toast({ title: "First" });
    const t2 = toast({ title: "Second" });
    expect(t1.id).not.toBe(t2.id);
  });

  it("sets onOpenChange to dismiss when open becomes false", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Test onOpenChange" });
    });
    const t = result.current.toasts[0];
    expect(typeof t.onOpenChange).toBe("function");
    // Calling onOpenChange(false) should dismiss (set open=false)
    act(() => {
      t.onOpenChange(false);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });
});
