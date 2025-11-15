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

  // Calculate main content margin based on rail state
  const getMainMargin = () => {
    return !showRail ? '0' : (isRailExpanded ? config.navigation.expandedWidth : config.navigation.collapsedWidth);
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
          paddingTop: `calc(${config.navigation.topBarHeight} + 1rem)`,
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
