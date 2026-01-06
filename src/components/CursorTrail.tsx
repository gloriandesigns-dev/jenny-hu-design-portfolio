import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  imageIndex: number;
}

const IMAGES = [
  'https://www.dropbox.com/scl/fi/qrz7jt6ivi8p3bprb2ykd/envato-labs-image-edit-24.webp?rlkey=x1zoxz60dkdt1ajc980eskmy0&st=ma6gd7r5&dl=1', // Paper
  'https://www.dropbox.com/scl/fi/mjoqos4tnhhibhi1frqx4/envato-labs-image-edit-21.webp?rlkey=ti7sc2d1p2msaax7603vii4ft&st=zbgz08ef&dl=1', // Cursor
];

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const countRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      const timeDiff = now - lastTime.current;

      // Throttle creation based on distance and time
      if (dist > 30 || (timeDiff > 100 && dist > 5)) {
        const id = countRef.current++;
        const newParticle: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          // Increased scale significantly to be "big enough to be seen"
          scale: 0.6 + Math.random() * 0.4, 
          imageIndex: Math.floor(Math.random() * IMAGES.length),
        };

        setParticles(prev => [...prev.slice(-15), newParticle]);
        
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0, x: particle.x, y: particle.y, rotate: particle.rotation }}
            animate={{ opacity: 1, scale: particle.scale }}
            exit={{ opacity: 0, scale: 0, y: particle.y + 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-12 h-12" // Increased container size
            style={{ left: 0, top: 0 }}
          >
            <img 
              src={IMAGES[particle.imageIndex]} 
              className="w-full h-full object-contain opacity-80" 
              alt="" 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
