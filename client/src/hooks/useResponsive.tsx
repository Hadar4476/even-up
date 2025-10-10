import { useEffect, useState } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Tailwind's md breakpoint is 768px
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return { isMobile };
};

export default useResponsive;
