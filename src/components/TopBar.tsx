import { Menu, Search, Wrench, Mic } from 'lucide-react';
import { copy } from '@/copy';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { VoiceRecordingDialog } from '@/components/VoiceRecordingDialog';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleVoiceSearchComplete = (transcript: string) => {
    setSearchValue(transcript);
    setIsVoiceDialogOpen(false);
    // TODO: Implement actual search functionality
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

    setShouldAutoStart(true);
    setIsVoiceDialogOpen(true);
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
      className="md:fixed md:top-0 z-50 w-full border-b border-border bg-card"
      style={{ height: config.navigation.topBarHeight }}
    >
      <div className="flex h-full items-center gap-4 px-4 max-w-full">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="shrink-0 hidden md:flex"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Brand */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Go to Tools page"
        >
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">
            {copy.app.title}
          </span>
        </button>

        {/* Spacer - smoothly grows from 1rem to 60rem between lg and really large screens */}
        <div
          className="shrink"
          style={{ width: 'clamp(1rem, 20vw, 60rem)' }}
        />

        {/* Search Bar - Full version (> 500px) */}
        <div className="flex-1 max-w-xl hidden min-[501px]:flex">
          <div className="flex w-full gap-2">
            <div className="flex flex-1">
              <Input
                ref={searchInputRef}
                id="search"
                name="search"
                type="search"
                placeholder={copy.search.placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-background rounded-r-none border-r-0 h-11"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Search"
                    className="rounded-l-none"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copy.search.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
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

        {/* Search & Mic Icons - Mobile version (<= 500px) */}
        <div className="flex-1 flex justify-end gap-2 min-[501px]:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Voice search"
                onClick={handleMicClick}
                className="hidden min-[290px]:flex"
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
