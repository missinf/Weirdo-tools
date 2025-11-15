import { Button } from '@/components/ui/button';
import { copy } from '@/copy';
import { Banner } from '@/components/Banner';
import { ToolCarousel } from '@/components/ToolCarousel';
import { Tool } from '@/components/ToolCard';
import { SearchResults } from '@/components/SearchResults';
import { FilterCarousel } from '@/components/FilterCarousel';
import { useSearch } from '@/contexts/SearchContext';
import { useMemo, useState } from 'react';

const popularTools = [
  { id: 1, name: 'Pomodoro Timer' },
  { id: 7, name: 'Brain Dump' },
  { id: 19, name: 'Quick Notes' },
  { id: 31, name: 'Breathing Exercise' },
  { id: 8, name: 'Task Sorter' },
  { id: 26, name: 'Mind Map' },
];

const savedTools = [
  { id: 2, name: 'Focus Sounds' },
  { id: 10, name: 'Priority Matrix' },
  { id: 22, name: 'Voice Memo' },
];

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

const filterOptions = [
  { id: 'all', label: copy.tools.filters.all },
  { id: 'recentlyUsed', label: copy.tools.filters.recentlyUsed },
  { id: 'saved', label: copy.tools.filters.saved },
  { id: 'focus', label: copy.tools.filters.focus },
  { id: 'organization', label: copy.tools.filters.organization },
  { id: 'time', label: copy.tools.filters.time },
  { id: 'memory', label: copy.tools.filters.memory },
  { id: 'creativity', label: copy.tools.filters.creativity },
  { id: 'wellness', label: copy.tools.filters.wellness },
];

export function ToolsPage() {
  const { searchQuery } = useSearch();
  const [activeFilter, setActiveFilter] = useState('all');

  // Get all tools from all categories for search
  const allTools = useMemo(() => {
    const toolsMap = new Map<number, Tool>();

    // Add popular tools
    popularTools.forEach(tool => toolsMap.set(tool.id, tool));

    // Add all category tools
    toolCategories.forEach(category => {
      category.tools.forEach(tool => toolsMap.set(tool.id, tool));
    });

    return Array.from(toolsMap.values());
  }, []);

  // Filter all tools based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(query)
    );
  }, [searchQuery, allTools]);

  // Show search results in grid if searching (desktop only - md and above)
  if (searchResults !== null) {
    return (
      <>
        <Banner
          storageKey="weirdo-tools-banner-dismissed"
          dismissLabel={copy.tools.banner.dismiss}
          ariaLabel="Welcome message"
          content={
            <p className="text-base leading-relaxed">
              <span className="font-semibold text-foreground">{copy.tools.banner.welcome}</span>{' '}
              <span className="text-muted-foreground">{copy.tools.banner.description}</span>
            </p>
          }
        />

        <SearchResults results={searchResults} searchQuery={searchQuery} />
      </>
    );
  }

  // Show normal category view when not searching
  return (
    <>
      <Banner
        storageKey="weirdo-tools-banner-dismissed"
        dismissLabel={copy.tools.banner.dismiss}
        ariaLabel="Welcome message"
        content={
          <p className="text-base leading-relaxed">
            <span className="font-semibold text-foreground">{copy.tools.banner.welcome}</span>{' '}
            <span className="text-muted-foreground">{copy.tools.banner.description}</span>
          </p>
        }
      />

      <div className="mb-6">
        <FilterCarousel
          filters={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="space-y-6">
        {/* Popular Tools Section */}
        <ToolCarousel title={copy.tools.popular} tools={popularTools} />

        {/* Saved Tools Section */}
        <ToolCarousel title={copy.tools.saved} tools={savedTools} />

        {/* Category Sections */}
        {toolCategories.map((category) => (
          <ToolCarousel key={category.name} title={category.name} tools={category.tools} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => window.open(copy.help.credits.discordLink, '_blank')}
        >
          {copy.tools.feedback}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => window.open(copy.help.credits.patreonLink, '_blank')}
        >
          {copy.tools.donate}
        </Button>
      </div>
    </>
  );
}
