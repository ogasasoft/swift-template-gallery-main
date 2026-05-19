import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialize state synchronously before any effects
  const [isMobile, setIsMobile] = React.useState<boolean>(
    window.innerWidth < MOBILE_BREAKPOINT,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      // Update state using a transition to avoid cascading renders
      React.startTransition(() => {
        setIsMobile(mql.matches);
      });
    };
    mql.addEventListener("change", onChange);
    // Set initial value using a transition
    React.startTransition(() => {
      setIsMobile(mql.matches);
    });
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
