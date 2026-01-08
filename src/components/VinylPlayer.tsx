import React, { useRef, useState } from 'react';
import clsx from 'clsx';

interface VinylPlayerProps {
  imageUrl: string;
  audioUrl: string;
  className?: string;
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ imageUrl, audioUrl, className }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed (likely interaction policy):", err);
      });
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={clsx("relative cursor-pointer touch-manipulation", className)}
      onMouseEnter={handleStart}
      onMouseLeave={handleStop}
      onTouchStart={(e) => {
        // Prevent default to avoid simulating mouse events if handled here
        // e.preventDefault(); // Optional: depends on if we want scrolling to be blocked
        handleStart();
      }}
      onTouchEnd={handleStop}
      onTouchCancel={handleStop}
    >
      <audio ref={audioRef} src={audioUrl} preload="auto" loop />
      
      <img
        src={imageUrl}
        alt="Vinyl Record"
        draggable={false}
        className={clsx(
          "w-full h-full object-contain rounded-full drop-shadow-2xl",
          // Using arbitrary value for a slower spin (4s) compared to default animate-spin (1s)
          isPlaying ? "animate-[spin_4s_linear_infinite]" : "transition-transform duration-500"
        )}
        style={{
            // If not playing, we want it to stop. 
            // The transition-transform helps smooth it out if we were rotating via transform, 
            // but animate-spin uses keyframes. 
            // When the class is removed, it snaps back or stops. 
            // For a vinyl, snapping to stop is acceptable or we could pause animation state.
            // Simple class toggling resets it, which matches "reset rotation" implied by reset audio.
        }}
      />
      
      {/* Optional: Center hole visual for realism */}
      <div className="absolute top-1/2 left-1/2 w-[15%] h-[15%] bg-[#1a1a1a] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[4%] h-[4%] bg-[#FDFCF8] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};
