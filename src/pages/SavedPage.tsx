import { Button } from '@/components/ui/button';
import { copy } from '@/copy';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SavedPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {copy.saved.title}
        </h1>
      </div>

      <div className="h-96 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Bookmark className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
          <p className="text-lg text-muted-foreground">{copy.saved.empty}</p>
          <Button
            onClick={() => navigate('/tools')}
            size="lg"
            className="text-base"
          >
            {copy.saved.browseTools}
          </Button>
        </div>
      </div>
    </div>
  );
}
