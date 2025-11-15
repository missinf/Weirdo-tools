import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { NavigationRail } from './NavigationRail';
import { useNavigation } from '@/hooks/useNavigation';
import { config } from '@/config';

export function Layout() {
  const {
    isRailExpanded,
    isModal,
    showRail,
    toggleRail,
    closeRail,
  } = useNavigation();

  console.log('[Layout] Rendering - showRail:', showRail, 'isRailExpanded:', isRailExpanded, 'isModal:', isModal);

  // Calculate main content margin based on rail state
  const getMainMargin = () => {
    const margin = !showRail ? '0' : (isRailExpanded ? config.navigation.expandedWidth : config.navigation.collapsedWidth);
    console.log('[Layout] getMainMargin() called - returning:', margin);
    return margin;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <TopBar onMenuClick={toggleRail} />

      {/* Navigation Rail (hidden on mobile) */}
      {showRail && (
        <NavigationRail
          isExpanded={isRailExpanded}
          isModal={isModal}
          onClose={closeRail}
        />
      )}

      {/* Main Content */}
      <main
        className="transition-all duration-150 px-4 py-8 pb-24 md:pb-8"
        style={{
          marginLeft: getMainMargin(),
          paddingTop: (() => {
            const width = window.innerWidth;
            const padding = width >= 768 ? `calc(${config.navigation.topBarHeight} + 2rem)` : '2rem';
            console.log('[Layout] Calculating paddingTop - width:', width, 'padding:', padding);
            return padding;
          })(),
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation (mobile only) */}
      <BottomNav />
    </div>
  );
}
