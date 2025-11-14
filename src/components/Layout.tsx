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
    if (!showRail) return '0'; // Mobile: no rail
    if (isRailExpanded) return config.navigation.expandedWidth;
    return config.navigation.collapsedWidth;
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
          marginTop: config.navigation.topBarHeight,
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
