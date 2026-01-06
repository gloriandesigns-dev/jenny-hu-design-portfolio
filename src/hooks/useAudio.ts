import { useCallback, useRef } from 'react';

export const useAudio = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = 0.2; // Low volume for UI sounds
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [url]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};

// Hook specifically for the vinyl loop with fade in/out
export const useVinylAudio = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<number | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }
    
    // Clear any existing fade interval
    if (fadeInterval.current) clearInterval(fadeInterval.current);

    audioRef.current.play().catch(() => {});

    // Fade in
    fadeInterval.current = window.setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 0.4) {
        audioRef.current.volume = Math.min(0.4, audioRef.current.volume + 0.05);
      } else {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
      }
    }, 100);
  }, [url]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    // Fade out
    fadeInterval.current = window.setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (fadeInterval.current) clearInterval(fadeInterval.current);
      }
    }, 100);
  }, []);

  return { play, stop };
};
