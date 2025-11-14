import { Menu, Search, Wrench } from 'lucide-react';
import { copy } from '@/copy';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-card"
      style={{ height: config.navigation.topBarHeight }}
    >
      <div className="flex h-full items-center gap-4 px-4">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="shrink-0 hidden md:flex"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">
            {copy.app.title}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full pl-10 bg-background"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
