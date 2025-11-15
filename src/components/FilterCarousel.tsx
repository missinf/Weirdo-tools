import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterCarouselProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function FilterCarousel({ filters, activeFilter, onFilterChange }: FilterCarouselProps) {
  return (
    <div className="w-full">
      {/* Scrollable container */}
      <div
        className="overflow-x-auto scrollbar-hide -mx-4 px-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-2 min-w-min">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                'rounded-lg px-4 whitespace-nowrap transition-colors',
                activeFilter === filter.id
                  ? 'bg-secondary text-secondary-foreground shadow-sm'
                  : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hiding styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
