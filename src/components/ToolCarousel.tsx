import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { copy } from '@/copy';

interface Tool {
  id: number;
  name: string;
}

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
              <Card className="w-[280px] cursor-pointer transition-colors hover:bg-accent">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
