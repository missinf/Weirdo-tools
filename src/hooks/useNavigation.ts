import { useState, useEffect } from 'react';
import { config } from '@/config';

// Calculate initial screen size synchronously to prevent layout shift
const getInitialScreenState = () => {
  if (typeof window === 'undefined') {
    return { isDesktop: false, isTablet: false, isRailExpanded: false };
  }

  const width = window.innerWidth;
  const desktop = width >= 1024;
  const tablet = width >= 768 && width < 1024;

  return {
    isDesktop: desktop,
    isTablet: tablet,
    isRailExpanded: desktop, // Expanded on desktop by default
  };
};

export function useNavigation() {
  const initialState = getInitialScreenState();
  const [isRailExpanded, setIsRailExpanded] = useState(initialState.isRailExpanded);
  const [isDesktop, setIsDesktop] = useState(initialState.isDesktop);
  const [isTablet, setIsTablet] = useState(initialState.isTablet);

  useEffect(() => {
    let timeoutId: number | null = null;
    let rafId: number | null = null;

    const checkScreenSize = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024; // >= desktop breakpoint
      const tablet = width >= 768 && width < 1024; // tablet range

      // Update states only if they actually changed (using functional updates to get current state)
      setIsDesktop((prev) => {
        return prev !== desktop ? desktop : prev;
      });

      setIsTablet((prev) => {
        return prev !== tablet ? tablet : prev;
      });

      // On desktop, rail is expanded by default
      // On tablet, rail is collapsed by default
      // On mobile (< 768px), rail is hidden (bottom nav used instead)
      if (desktop) {
        setIsRailExpanded(true);
      } else if (tablet) {
        setIsRailExpanded(false);
      }
    };

    const debouncedResize = () => {
      // Cancel any pending timeout
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      // Cancel any pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Use RAF to sync with browser paint, then add small delay
      rafId = requestAnimationFrame(() => {
        timeoutId = window.setTimeout(() => {
          checkScreenSize();
        }, config.navigation.resizeDebounce);
      });
    };

    // Run immediately on mount
    checkScreenSize();

    // Add debounced listener for resize events
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const toggleRail = () => {
    setIsRailExpanded((prev) => !prev);
  };

  const closeRail = () => {
    // Only close if on tablet (modal mode)
    if (isTablet) {
      setIsRailExpanded(false);
    }
  };

  // Determine if rail is in modal mode (tablet only)
  const isModal = isTablet;

  // Determine if rail should be shown (tablet or desktop)
  const showRail = isTablet || isDesktop;

  return {
    isRailExpanded,
    isModal,
    showRail,
    isDesktop,
    isTablet,
    toggleRail,
    closeRail,
  };
}
