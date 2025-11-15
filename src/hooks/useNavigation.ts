import { useState, useEffect } from 'react';

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
    const checkScreenSize = () => {
      const timestamp = performance.now();
      const width = window.innerWidth;
      const desktop = width >= 1024; // >= desktop breakpoint
      const tablet = width >= 768 && width < 1024; // tablet range

      console.log(`[useNavigation] Resize event at ${timestamp.toFixed(2)}ms - Width: ${width}px`);

      const prevDesktop = isDesktop;
      const prevTablet = isTablet;

      setIsDesktop(desktop);
      setIsTablet(tablet);

      // Log state transitions
      if (prevDesktop !== desktop) {
        console.log(`[useNavigation] Desktop state changed: ${prevDesktop} -> ${desktop}`);
      }
      if (prevTablet !== tablet) {
        console.log(`[useNavigation] Tablet state changed: ${prevTablet} -> ${tablet}`);
      }

      // On desktop, rail is expanded by default
      // On tablet, rail is collapsed by default
      // On mobile (< 768px), rail is hidden (bottom nav used instead)
      if (desktop) {
        console.log(`[useNavigation] Setting rail to EXPANDED (desktop mode)`);
        setIsRailExpanded(true);
      } else if (tablet) {
        console.log(`[useNavigation] Setting rail to COLLAPSED (tablet mode)`);
        setIsRailExpanded(false);
      } else {
        console.log(`[useNavigation] Mobile mode - rail will be hidden`);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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
