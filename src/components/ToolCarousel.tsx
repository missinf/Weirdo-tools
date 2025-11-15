import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ToolCard, Tool } from '@/components/ToolCard';

interface ToolCarouselProps {
  title: string;
  tools: Tool[];
}

export function ToolCarousel({ title, tools }: ToolCarouselProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {tools.map((tool) => (
            <CarouselItem key={tool.id} className="pl-4 basis-auto">
              <ToolCard tool={tool} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
