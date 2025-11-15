import { useEffect } from 'react';
import { Mic } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VoiceRecordingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transcript: string;
  interimTranscript: string;
  isRecording: boolean;
  error: string | null;
  onCancel: () => void;
  onStart: () => void;
  onStop: () => void;
}

export function VoiceRecordingDialog({
  open,
  onOpenChange,
  transcript,
  interimTranscript,
  isRecording,
  error,
  onCancel,
  onStart,
  onStop,
}: VoiceRecordingDialogProps) {
  // Cleanup: Stop recording if dialog is closed while recording
  useEffect(() => {
    if (!open && isRecording) {
      onCancel();
    }
  }, [open, isRecording, onCancel]);

  const fullText = transcript + interimTranscript;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="space-y-6">
          {/* Transcript display */}
          <div className="min-h-[80px] rounded-md bg-background p-4 flex items-center justify-center">
            {error ? (
              <p className="text-2xl text-destructive">{error}</p>
            ) : fullText ? (
              <p className="text-2xl leading-relaxed text-foreground text-center">
                <span>{transcript}</span>
                <span className="text-foreground opacity-60">{interimTranscript}</span>
              </p>
            ) : isRecording ? (
              <p className="text-2xl text-foreground">Listening...</p>
            ) : (
              <p className="text-2xl text-foreground">Didn't hear that, try again.</p>
            )}
          </div>

          {/* Toggle recording button */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              {isRecording ? (
                <>
                  {/* Pulsing rings */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-destructive opacity-75"></span>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-destructive opacity-50" style={{ animationDelay: '0.5s' }}></span>
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={onStop}
                    className="h-16 w-16 rounded-full relative z-10"
                  >
                    <Mic className="h-7 w-7" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={onStart}
                  className="h-16 w-16 rounded-full"
                >
                  <Mic className="h-7 w-7" />
                </Button>
              )}
            </div>
            {/* Helper text - always reserve space */}
            <div className="min-h-[20px] text-sm text-muted-foreground">
              {!isRecording && (
                <span>Tap microphone to try again</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
