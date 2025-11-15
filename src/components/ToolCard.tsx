import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { copy } from '@/copy';

export interface Tool {
  id: number;
  name: string;
}

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
  className?: string;
}

export function ToolCard({ tool, onClick, className = 'w-[180px] md:w-[200px]' }: ToolCardProps) {
  return (
    <Card
      className={`${className} cursor-pointer transition-colors hover:bg-accent`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="h-32 rounded-md bg-muted flex items-center justify-center text-muted-foreground mb-3">
          {copy.tools.comingSoon}
        </div>
        <CardTitle className="text-lg text-center">{tool.name}</CardTitle>
      </CardContent>
    </Card>
  );
}
