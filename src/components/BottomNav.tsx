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

export function BottomNav() {
  console.log('[BottomNav] Rendering');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex-1',
                'text-muted-foreground hover:text-foreground hover:bg-accent',
                isActive && 'bg-accent text-foreground'
              )
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
