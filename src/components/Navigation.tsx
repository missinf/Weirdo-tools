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

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">
              {copy.app.title}
            </h1>
          </div>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md transition-colors min-h-[44px]',
                    'text-muted-foreground hover:text-foreground hover:bg-accent',
                    isActive && 'bg-accent text-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
