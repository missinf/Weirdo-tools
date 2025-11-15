import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

      <Card>
        <CardContent className="pt-6">
          <div className="h-64 rounded-md border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium text-foreground mb-1">{copy.saved.emptyTitle}</p>
              <p className="text-sm">{copy.saved.emptyDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
