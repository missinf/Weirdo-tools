import { useSearch } from '@/contexts/SearchContext';
import { SearchResults } from '@/components/SearchResults';
import { Tool } from '@/components/ToolCard';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the same tool data from ToolsPage
const popularTools = [
  { id: 1, name: 'Pomodoro Timer' },
  { id: 7, name: 'Brain Dump' },
  { id: 19, name: 'Quick Notes' },
  { id: 31, name: 'Breathing Exercise' },
  { id: 8, name: 'Task Sorter' },
  { id: 26, name: 'Mind Map' },
];

const toolCategories = [
  {
    name: 'Focus & Concentration',
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
    name: 'Organization & Planning',
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
    name: 'Time Management',
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
    name: 'Memory & Recall',
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
    name: 'Creativity & Ideas',
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
    name: 'Wellness & Balance',
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

export function SearchPage() {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  // Redirect to tools page if screen becomes medium or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate('/');
      }
    };

    window.addEventListener('resize', handleResize);

    // Check on mount in case user directly navigates to /search on desktop
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  // Clear search query when component unmounts (user leaves page)
  useEffect(() => {
    return () => {
      setSearchQuery('');
    };
  }, [setSearchQuery]);

  // Get all unique tools
  const allTools = useMemo(() => {
    const toolsMap = new Map<number, Tool>();

    popularTools.forEach(tool => toolsMap.set(tool.id, tool));
    toolCategories.forEach(category => {
      category.tools.forEach(tool => toolsMap.set(tool.id, tool));
    });

    return Array.from(toolsMap.values());
  }, []);

  // Filter tools based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(query)
    );
  }, [searchQuery, allTools]);

  return (
    <div className="space-y-6">
      {searchQuery.trim() ? (
        <SearchResults results={searchResults} searchQuery={searchQuery} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Start typing to search for tools
          </p>
        </div>
      )}
    </div>
  );
}
