import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AssetConfig, Mode, Position } from '../assets';
import { useAudio, useVinylAudio } from '../hooks/useAudio';

interface FloatingElementProps {
  asset: AssetConfig;
  mode: Mode;
  className?: string;
  style?: React.CSSProperties;
}

// Helper to parse position values for Framer Motion
const getPositionStyles = (pos: Position) => {
  const styles: any = {
    rotate: pos.rotate,
    zIndex: pos.zIndex,
    scale: pos.scale,
    opacity: pos.opacity ?? 1,
  };

  if (pos.top !== undefined) styles.top = pos.top;
  if (pos.left !== undefined) styles.left = pos.left;
  if (pos.right !== undefined) styles.right = pos.right;
  if (pos.bottom !== undefined) styles.bottom = pos.bottom;
  
  return styles;
};

const JAZZ_URL = "https://assets.mixkit.co/active_storage/sfx/117/117-preview.m4a";
const POP_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.m4a";

export const FloatingElement: React.FC<FloatingElementProps> = ({ asset, mode, className, style }) => {
  const targetPos = asset.modes[mode];
  const isVinyl = asset.type === 'vinyl';
  
  const { play: playPop } = useAudio(POP_URL);
  const { play: playJazz, stop: stopJazz } = useVinylAudio(JAZZ_URL);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playPop();
    if (isVinyl) playJazz();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isVinyl) stopJazz();
  };

  return (
    <motion.div
      layout
      className={`absolute select-none pointer-events-auto cursor-pointer ${className || ''}`}
      style={style}
      initial={false}
      animate={{
        ...getPositionStyles(targetPos),
        
        // Removed idle floating animation (y loop) as per request
        y: 0, 
        
        // Rotation: If vinyl and hovered, spin 360. Otherwise, stick to layout rotation.
        // No idle wobble.
        rotate: isHovered 
          ? (isVinyl ? 360 : targetPos.rotate)
          : targetPos.rotate,
        
        x: (targetPos.left === '50%' || targetPos.left === 50) ? '-50%' : 0,
      }}
      transition={{
        layout: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }, // Smooth morph
        top: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
        left: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
        right: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
        bottom: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.8 },
        scale: { duration: 0.3 }, // Faster scale response on hover
        
        // Rotation transition
        rotate: {
            duration: isVinyl && isHovered ? 3 : 1.2, // Slow spin for vinyl
            repeat: isVinyl && isHovered ? Infinity : 0,
            ease: isVinyl && isHovered ? "linear" : [0.25, 1, 0.5, 1]
        }
      }}
      whileHover={{
        scale: targetPos.scale * 1.1,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={asset.src} 
        alt={asset.alt} 
        className="w-auto h-auto max-w-[150px] md:max-w-[200px] object-contain drop-shadow-lg"
        draggable={false}
      />
    </motion.div>
  );
};
