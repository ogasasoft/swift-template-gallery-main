import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    // Set initial value synchronously - this is intentional for immediate feedback
    // The media query will be accurate after mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // eslint-disable-line react-hooks/set-state-in-effect
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile !== undefined ? isMobile : false;
}
