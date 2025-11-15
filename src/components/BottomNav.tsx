import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Wrench, Bookmark, HelpCircle, Settings } from 'lucide-react';
import { copy } from '@/copy';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: copy.nav.tools, icon: Wrench },
  { to: '/saved', label: copy.nav.saved, icon: Bookmark },
  { to: '/help', label: copy.nav.help, icon: HelpCircle },
  { to: '/settings', label: copy.nav.settings, icon: Settings },
];

export const BottomNav = memo(function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around h-12">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-colors min-h-[44px] min-w-[44px] flex-1',
                'text-muted-foreground hover:text-foreground hover:bg-accent',
                isActive && 'bg-accent text-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
});
