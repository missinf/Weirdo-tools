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
        <CardHeader>
          <CardTitle>{copy.saved.noSavedTitle}</CardTitle>
          <CardDescription>{copy.saved.empty}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-md border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{copy.saved.placeholder}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
