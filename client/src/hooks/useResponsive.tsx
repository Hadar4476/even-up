import { useEffect, useState } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with actual value instead of false
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 767px)").matches;
    }

    return false; // SSR fallback
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return { isMobile };
};

export default useResponsive;
