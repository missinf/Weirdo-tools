import { useState, useCallback, useRef, useEffect } from 'react';

interface UseVoiceRecordingOptions {
  onTranscriptComplete?: (transcript: string) => void;
  language?: string;
  silenceTimeout?: number; // milliseconds of silence before auto-stopping
  initialDelay?: number; // milliseconds to wait before starting silence detection
}

interface UseVoiceRecordingReturn {
  isRecording: boolean;
  transcript: string;
  interimTranscript: string;
  startRecording: () => void;
  stopRecording: () => void;
  cancelRecording: () => void;
  isSupported: boolean;
  error: string | null;
}

export function useVoiceRecording({
  onTranscriptComplete,
  language = 'en-US',
  silenceTimeout = 2000, // 2 seconds default
  initialDelay = 3000, // 3 seconds default
}: UseVoiceRecordingOptions = {}): UseVoiceRecordingReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onTranscriptCompleteRef = useRef(onTranscriptComplete);
  const hasStartedSpeakingRef = useRef(false);

  // Keep the callback ref updated
  useEffect(() => {
    onTranscriptCompleteRef.current = onTranscriptComplete;
  }, [onTranscriptComplete]);

  // Check if Web Speech API is supported
  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Helper to clear silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  // Helper to auto-stop after silence
  const scheduleAutoStop = useCallback(() => {
    clearSilenceTimer();

    silenceTimerRef.current = setTimeout(() => {
      console.log('Silence detected, auto-stopping...');
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }, silenceTimeout);
  }, [clearSilenceTimer, silenceTimeout]);

  useEffect(() => {
    if (!isSupported) return;

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
      hasStartedSpeakingRef.current = false;
      console.log('Voice recording started');
      // Start the initial delay timer when recording begins
      silenceTimerRef.current = setTimeout(() => {
        console.log('Initial delay passed, now monitoring for silence');
        scheduleAutoStop();
      }, initialDelay);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + ' ';
        } else {
          interimText += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript((prev) => prev + finalText);
      }
      setInterimTranscript(interimText);

      // Once user has started speaking, immediately switch to silence detection mode
      if (!hasStartedSpeakingRef.current) {
        hasStartedSpeakingRef.current = true;
        console.log('User started speaking, immediately switching to silence detection');
        // Clear the initial delay timer and start the shorter silence timer
        clearSilenceTimer();
      }

      // Reset silence timer whenever we get speech results
      scheduleAutoStop();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      clearSilenceTimer();
      console.log('Voice recording ended');

      // Call the callback with the final transcript
      setTranscript((currentTranscript) => {
        setInterimTranscript((currentInterim) => {
          const finalTranscript = currentTranscript + currentInterim;
          if (finalTranscript.trim() && onTranscriptCompleteRef.current) {
            onTranscriptCompleteRef.current(finalTranscript.trim());
          }
          return '';
        });
        return currentTranscript;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      clearSilenceTimer();
    };
  }, [isSupported, language, clearSilenceTimer, scheduleAutoStop, initialDelay]);

  const startRecording = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    setTranscript('');
    setInterimTranscript('');
    setError(null);

    try {
      recognitionRef.current?.start();
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to start recording');
    }
  }, [isSupported]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      clearSilenceTimer();
      recognitionRef.current.stop();
      // The onend handler will call onTranscriptComplete
    }
  }, [isRecording, clearSilenceTimer]);

  const cancelRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      clearSilenceTimer();
      recognitionRef.current.stop();
      setTranscript('');
      setInterimTranscript('');
      setError(null);
    }
  }, [isRecording, clearSilenceTimer]);

  return {
    isRecording,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
