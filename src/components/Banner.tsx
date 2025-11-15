import { useState, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerProps {
  storageKey: string;
  content: ReactNode;
  dismissLabel?: string;
  ariaLabel?: string;
}

export function Banner({
  storageKey,
  content,
  dismissLabel = 'Got it',
  ariaLabel = 'Banner message'
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem(storageKey) !== 'true';
  });

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-[64px] left-0 right-0 z-40 border-b border-primary bg-secondary shadow-lg animate-in slide-in-from-top-4 duration-300"
      role="region"
      aria-label={ariaLabel}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
        {content}
        <Button size="sm" onClick={handleDismiss}>
          {dismissLabel}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="h-8 w-8"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
