import { useState, useEffect } from 'react';

export function useNavigation() {
  const [isRailExpanded, setIsRailExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024; // >= desktop breakpoint
      const tablet = width >= 768 && width < 1024; // tablet range

      setIsDesktop(desktop);
      setIsTablet(tablet);

      // On desktop, rail is expanded by default
      // On tablet, rail is collapsed by default
      // On mobile (< 768px), rail is hidden (bottom nav used instead)
      if (desktop) {
        setIsRailExpanded(true);
      } else if (tablet) {
        setIsRailExpanded(false);
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
