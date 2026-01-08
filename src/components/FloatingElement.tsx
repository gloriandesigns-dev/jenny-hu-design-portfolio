import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AssetConfig, Mode, Position } from '../assets';
import { useAudio } from '../hooks/useAudio';
import { VinylPlayer } from './VinylPlayer';
import clsx from 'clsx';

interface FloatingElementProps {
  asset: AssetConfig;
  mode: Mode;
  className?: string;
}

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

const POP_URL = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.m4a";
// Frank Ocean Track
const FRANK_OCEAN_URL = "https://www.dropbox.com/scl/fi/v72j8sp56b7xh7giovrlo/Frank-Ocean-Nikes.mp3?rlkey=jpeh1f4oq107p21ix0lmlocyk&st=372azrh2&dl=1";

export const FloatingElement: React.FC<FloatingElementProps> = ({ asset, mode, className }) => {
  const targetPos = asset.modes[mode] || asset.modes.chaos;
  const isVinyl = asset.type === 'vinyl';
  
  const { play: playPop } = useAudio(POP_URL);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isVinyl) playPop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentRotation = targetPos.rotate;

  if (isVinyl) {
    return (
      <motion.div
        layoutId={asset.id}
        className={clsx("absolute select-none pointer-events-auto", className)}
        initial={false}
        animate={{
          ...getPositionStyles(targetPos),
          y: 0,
          x: (targetPos.left === '50%' || targetPos.left === 50) ? '-50%' : 0,
          rotate: currentRotation, 
        }}
        transition={{
          layout: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
          opacity: { duration: 0.8 },
          rotate: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        <VinylPlayer 
          imageUrl={asset.src} 
          audioUrl={FRANK_OCEAN_URL} 
          className="w-[150px] md:w-[220px] h-auto"
        />
      </motion.div>
    );
  }

  // Standard Render for non-vinyl assets (including keyboard/typewriter)
  return (
    <motion.div
      layoutId={asset.id}
      className={clsx(
        "absolute select-none pointer-events-auto cursor-pointer",
        className
      )}
      initial={false}
      animate={{
        ...getPositionStyles(targetPos),
        y: 0,
        x: (targetPos.left === '50%' || targetPos.left === 50) ? '-50%' : 0,
        rotate: currentRotation,
      }}
      transition={{
        layout: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.8 },
        rotate: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
      }}
      whileHover={{
        scale: 1.05, // Increased slightly to be noticeable but subtle
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={asset.src} 
        alt={asset.alt} 
        className="w-[150px] md:w-[220px] h-auto object-contain drop-shadow-2xl transition-all duration-500"
        draggable={false}
      />
    </motion.div>
  );
};
