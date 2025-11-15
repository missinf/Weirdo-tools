import { Card, CardContent } from '@/components/ui/card';
import { copy } from '@/copy';
import { Bookmark } from 'lucide-react';
import mascotWrench from '@/assets/images/mascotwrench.webp';

export function SavedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {copy.saved.title}
        </h1>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center h-64 pt-6">
          <div className="text-center text-muted-foreground">
            <img
              src={mascotWrench}
              alt="Weirdo mascot with wrench"
              className="h-32 mx-auto mb-4"
            />
            <p className="font-medium text-foreground mb-1">{copy.saved.emptyTitle}</p>
            <p className="text-sm">{copy.saved.emptyDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
