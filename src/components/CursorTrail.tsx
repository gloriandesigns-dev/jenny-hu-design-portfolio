import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  image: string;
}

const db = (url: string) => url.replace('dl=0', 'dl=1');

const TRAIL_IMAGES = [
  db('https://www.dropbox.com/scl/fi/mjoqos4tnhhibhi1frqx4/envato-labs-image-edit-21.webp?rlkey=ti7sc2d1p2msaax7603vii4ft&st=zbgz08ef&dl=0'), // Cursor
  db('https://www.dropbox.com/scl/fi/qrz7jt6ivi8p3bprb2ykd/envato-labs-image-edit-24.webp?rlkey=x1zoxz60dkdt1ajc980eskmy0&st=ma6gd7r5&dl=0'), // Paper
  db('https://www.dropbox.com/scl/fi/zm7yhj98qrefpi53s2t55/envato-labs-image-edit-32.webp?rlkey=a7pfkookikt3sel9858wt0z5q&st=vtjdrjie&dl=0'), // Stain
  db('https://www.dropbox.com/scl/fi/456urdmr5pyh3ks3iyqz7/envato-labs-image-edit-25.webp?rlkey=gdk17vz9wjbypo60iiwi7jo47&st=qdcsy8x5&dl=0'), // Film
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

      // Increased distance threshold to 60px for better spacing
      if (dist > 60 || (timeDiff > 100 && dist > 20)) {
        const id = countRef.current++;
        
        const newParticle: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.4, // Varied scale
          image: TRAIL_IMAGES[id % TRAIL_IMAGES.length], // Cycle through images
        };

        setParticles(prev => [...prev.slice(-15), newParticle]);
        
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 1000); // Slightly longer life
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
            animate={{ opacity: 0.9, scale: particle.scale }}
            exit={{ opacity: 0, scale: 0, y: particle.y + 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-16 h-16 -ml-8 -mt-8"
            style={{ left: 0, top: 0 }}
          >
            <img 
              src={particle.image} 
              className="w-full h-full object-contain drop-shadow-md" 
              alt="" 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
