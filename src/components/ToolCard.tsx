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

export function ToolCard({ tool, onClick, className = 'w-[280px]' }: ToolCardProps) {
  return (
    <Card
      className={`${className} cursor-pointer transition-colors hover:bg-accent`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg">{tool.name}</CardTitle>
        <CardDescription>
          {copy.tools.placeholderTool}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {copy.tools.comingSoon}
        </div>
      </CardContent>
    </Card>
  );
}
