import { Menu, Search, Wrench, Mic, ArrowLeft } from 'lucide-react';
import { copy } from '@/copy';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { VoiceRecordingDialog } from '@/components/VoiceRecordingDialog';
import { useSearch } from '@/contexts/SearchContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSearchPage = location.pathname === '/search';

  // Auto-focus search input when on search page
  useEffect(() => {
    if (isSearchPage && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchPage]);

  const handleVoiceSearchComplete = (transcript: string) => {
    setSearchQuery(transcript);
    setIsVoiceDialogOpen(false);
  };

  const {
    isRecording,
    transcript,
    interimTranscript,
    startRecording,
    stopRecording,
    cancelRecording,
    isSupported,
    error,
  } = useVoiceRecording({
    onTranscriptComplete: handleVoiceSearchComplete,
    silenceTimeout: config.voiceRecording.silenceTimeout,
    initialDelay: config.voiceRecording.initialDelay,
  });

  // Auto-start recording when dialog opens if flag is set
  useEffect(() => {
    if (isVoiceDialogOpen && shouldAutoStart) {
      setShouldAutoStart(false);
      startRecording();
    }
  }, [isVoiceDialogOpen, shouldAutoStart, startRecording]);

  const handleMicClick = () => {
    if (!isSupported) {
      alert(copy.search.voice.unsupported);
      return;
    }

    // Navigate to search page first on mobile before opening dialog
    if (!isSearchPage && window.innerWidth < 768) {
      navigate('/search');
      // Wait a bit for navigation to complete before opening dialog
      setTimeout(() => {
        setShouldAutoStart(true);
        setIsVoiceDialogOpen(true);
      }, 100);
    } else {
      setShouldAutoStart(true);
      setIsVoiceDialogOpen(true);
    }
  };

  const handleVoiceCancel = () => {
    cancelRecording();
    setIsVoiceDialogOpen(false);
  };

  const handleVoiceStart = () => {
    startRecording();
  };

  const handleVoiceStop = () => {
    stopRecording();
  };

  return (
    <header
      className="fixed top-0 z-50 w-full bg-background h-10 md:h-10"
    >
      <div className="flex h-full items-center gap-2 px-2 md:gap-3 md:px-4 max-w-full">
        {/* Back Button - Only on mobile search page */}
        {isSearchPage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0 md:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Menu Button - Hidden on mobile search page */}
        {!isSearchPage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="shrink-0 hidden md:flex"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Brand - Hidden on mobile search page */}
        {!isSearchPage && (
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 md:gap-2 shrink-0 hover:opacity-80 transition-opacity cursor-pointer md:flex"
            aria-label="Go to Tools page"
          >
            <Wrench className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <span className="text-lg md:text-xl font-semibold text-foreground">
              {copy.app.title}
            </span>
          </button>
        )}

        {/* Spacer - smoothly grows from 1rem to 60rem between lg and really large screens */}
        {!isSearchPage && (
          <div
            className="shrink"
            style={{ width: 'clamp(1rem, 20vw, 60rem)' }}
          />
        )}

        {/* Search Bar - Full version (Desktop: >= 768px OR Mobile on Search Page) */}
        <div className={`flex-1 max-w-xl ${isSearchPage ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex w-full gap-2">
            <ButtonGroup className="flex-1">
              <Input
                ref={searchInputRef}
                id="search"
                name="search"
                type="search"
                placeholder={copy.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background h-8 md:h-9"
                autoFocus={isSearchPage}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copy.search.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Voice search"
                  onClick={handleMicClick}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copy.search.voice.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Search & Mic Icons - Mobile version (< 768px) - Hidden on search page */}
        {!isSearchPage && (
          <div className="flex-1 flex justify-end gap-2 md:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search"
                  onClick={() => navigate('/search')}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copy.search.tooltip}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Voice search"
                  onClick={handleMicClick}
                  className="hidden min-[320px]:flex"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copy.search.voice.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Voice Recording Dialog */}
      <VoiceRecordingDialog
        open={isVoiceDialogOpen}
        onOpenChange={setIsVoiceDialogOpen}
        transcript={transcript}
        interimTranscript={interimTranscript}
        isRecording={isRecording || shouldAutoStart}
        error={error}
        onCancel={handleVoiceCancel}
        onStart={handleVoiceStart}
        onStop={handleVoiceStop}
      />
    </header>
  );
}
