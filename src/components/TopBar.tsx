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

        {/* Spacer - smoothly grows from 1rem to 40rem between lg and really large screens */}
        <div
          className="shrink-0"
          style={{ width: 'clamp(1rem, 15vw, 40rem)' }}
        />

        {/* Search Bar - Full version (> 500px) */}
        <div className="flex-1 max-w-2xl hidden min-[501px]:flex">
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Search"
              className="flex-1 bg-background rounded-r-none border-r-0 h-11"
            />
            <Button
              variant="secondary"
              size="icon"
              aria-label="Search"
              className="rounded-l-none"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Icon Only - Mobile version (<= 500px) */}
        <div className="flex-1 flex justify-end min-[501px]:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
