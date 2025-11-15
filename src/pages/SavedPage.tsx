import { copy } from '@/copy';
import { Bookmark } from 'lucide-react';

export function SavedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {copy.saved.title}
        </h1>
      </div>
    </div>
  );
}
