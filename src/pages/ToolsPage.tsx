import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { copy } from '@/copy';
import { Banner } from '@/components/Banner';

const toolCategories = [
  {
    name: copy.tools.categories.focus,
    tools: [
      { id: 1, name: 'Pomodoro Timer' },
      { id: 2, name: 'Focus Sounds' },
      { id: 3, name: 'Distraction Blocker' },
      { id: 4, name: 'Task Sprints' },
      { id: 5, name: 'Focus Mode' },
      { id: 6, name: 'Deep Work Timer' },
    ],
  },
  {
    name: copy.tools.categories.organization,
    tools: [
      { id: 7, name: 'Brain Dump' },
      { id: 8, name: 'Task Sorter' },
      { id: 9, name: 'Visual Planner' },
      { id: 10, name: 'Priority Matrix' },
      { id: 11, name: 'Project Organizer' },
      { id: 12, name: 'Habit Tracker' },
    ],
  },
  {
    name: copy.tools.categories.time,
    tools: [
      { id: 13, name: 'Time Tracker' },
      { id: 14, name: 'Deadline Helper' },
      { id: 15, name: 'Routine Builder' },
      { id: 16, name: 'Time Blocker' },
      { id: 17, name: 'Schedule Visualizer' },
      { id: 18, name: 'Time Estimator' },
    ],
  },
  {
    name: copy.tools.categories.memory,
    tools: [
      { id: 19, name: 'Quick Notes' },
      { id: 20, name: 'Reminder Helper' },
      { id: 21, name: 'Memory Palace' },
      { id: 22, name: 'Voice Memo' },
      { id: 23, name: 'Idea Capture' },
      { id: 24, name: 'Study Flashcards' },
    ],
  },
  {
    name: copy.tools.categories.creativity,
    tools: [
      { id: 25, name: 'Idea Generator' },
      { id: 26, name: 'Mind Map' },
      { id: 27, name: 'Random Prompt' },
      { id: 28, name: 'Creative Sprint' },
      { id: 29, name: 'Brainstorm Board' },
      { id: 30, name: 'Inspiration Feed' },
    ],
  },
  {
    name: copy.tools.categories.wellness,
    tools: [
      { id: 31, name: 'Breathing Exercise' },
      { id: 32, name: 'Mood Tracker' },
      { id: 33, name: 'Energy Levels' },
      { id: 34, name: 'Stress Relief' },
      { id: 35, name: 'Gratitude Journal' },
      { id: 36, name: 'Break Reminder' },
    ],
  },
];

export function ToolsPage() {
  return (
    <>
      <Banner
        storageKey="weirdo-tools-banner-dismissed"
        dismissLabel={copy.tools.banner.dismiss}
        ariaLabel="Welcome message"
        content={
          <p className="text-base leading-relaxed">
            <span className="font-semibold text-foreground">Welcome!</span>{' '}
            <span className="text-muted-foreground">These are small tools made to help with ADHD.</span>
          </p>
        }
      />

      <div className="space-y-8">
        {toolCategories.map((category) => (
          <div key={category.name} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {category.name}
            </h2>
            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {category.tools.map((tool) => (
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
                          Coming Soon
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
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => window.open(copy.help.credits.discordLink, '_blank')}
            >
              {copy.tools.feedback}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share feedback on Discord</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => window.open(copy.help.credits.patreonLink, '_blank')}
            >
              {copy.tools.donate}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Support on Patreon</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
