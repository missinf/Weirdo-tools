import { NavLink } from 'react-router-dom';
import { Wrench, Bookmark, HelpCircle, Settings, X } from 'lucide-react';
import { copy } from '@/copy';
import { config } from '@/config';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

const navItems = [
  { to: '/', label: copy.nav.tools, icon: Wrench },
  { to: '/saved', label: copy.nav.saved, icon: Bookmark },
  { to: '/help', label: copy.nav.help, icon: HelpCircle },
  { to: '/settings', label: copy.nav.settings, icon: Settings },
];

interface NavigationRailProps {
  isExpanded: boolean;
  isModal: boolean;
  onClose?: () => void;
}

export function NavigationRail({
  isExpanded,
  isModal,
  onClose,
}: NavigationRailProps) {
  const width = isExpanded
    ? config.navigation.expandedWidth
    : config.navigation.collapsedWidth;

  return (
    <>
      {/* Backdrop for modal mode */}
      {isModal && isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Navigation Rail */}
      <nav
        className={cn(
          'fixed left-0 z-50 bg-background transition-all duration-150 hidden md:flex flex-col',
          isModal && isExpanded && 'shadow-lg'
        )}
        style={{
          width,
          top: config.navigation.topBarHeight,
          bottom: 0,
        }}
      >
        {/* Navigation Items */}
        <div className="flex flex-col gap-2 p-2 flex-1">
          {navItems.map((item) => {
            const navLink = (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (isModal && isExpanded && onClose) {
                    onClose();
                  }
                }}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-4 py-3 rounded-md transition-colors min-h-[44px]',
                    'text-muted-foreground hover:text-foreground hover:bg-accent',
                    isActive && 'bg-accent text-foreground'
                  )
                }
              >
                <item.icon className="h-6 w-6 shrink-0" />
                {isExpanded && (
                  <span className="text-sm font-medium ml-4">{item.label}</span>
                )}
              </NavLink>
            );

            if (!isExpanded) {
              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>
                    {navLink}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return navLink;
          })}
        </div>
      </nav>
    </>
  );
}
