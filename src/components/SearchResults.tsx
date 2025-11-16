import { ToolCard, Tool } from '@/components/ToolCard';

interface SearchResultsProps {
  results: Tool[];
  searchQuery: string;
}

export function SearchResults({ results, searchQuery }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No tools found matching "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">
        Search Results
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.map((tool) => (
          <ToolCard key={tool.id} tool={tool} className="w-full" />
        ))}
      </div>
    </div>
  );
}
