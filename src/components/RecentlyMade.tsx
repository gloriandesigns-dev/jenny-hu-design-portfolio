import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Coffee, Smile, Lightbulb } from 'lucide-react';
import clsx from 'clsx';

// --- Types ---
interface Project {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string; // Tailwind class
  image: string;
}

// --- Data ---
const db = (url: string) => url.replace('dl=0', 'dl=1');

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Print Editorial",
    subtitle: "Simple, Smart & Unique mockups",
    icon: <Box className="text-white" size={28} />,
    bgColor: "bg-orange-500",
    image: db("https://www.dropbox.com/scl/fi/crp1o8t8iwzksmlwifwju/e203bd241025033.694c05ca5bb3e.webp?rlkey=7973ghk1b9sih3o94jzt7yc5r&st=dzvggu38&dl=0")
  },
  {
    id: 2,
    title: "Efsy - Coffee branding",
    subtitle: "Easy, Minimal Coffee for you.",
    icon: <Coffee className="text-stone-800" size={28} />,
    bgColor: "bg-[#F5F5DC]", // Light Beige
    image: db("https://www.dropbox.com/scl/fi/dj7mv4h0m4lckyeit45hf/309d4c205032129.66b649bb16a70.webp?rlkey=rqwijg30ligx0tfa76o2t6how&st=709k7nfb&dl=0")
  },
  {
    id: 3,
    title: "Osom",
    subtitle: "Your Race, Your pace",
    icon: <Smile className="text-stone-800" size={28} />,
    bgColor: "bg-orange-200",
    image: db("https://www.dropbox.com/scl/fi/tissx7yrieqykcu0pdm26/5b53ff241543021.695af441581b2.webp?rlkey=n9iwe0kk91ekvf1gu0zupvj46&st=mwp5nc94&dl=0")
  },
  {
    id: 4,
    title: "Norwie",
    subtitle: "For making your home smart",
    icon: <Lightbulb className="text-white" size={28} />,
    bgColor: "bg-black",
    image: db("https://www.dropbox.com/scl/fi/kfgva73bzekyvhl1razkh/e8ce4b221848159.67db5b095e6ee.webp?rlkey=ojr4n1eu0zpl7cmsvdlkk3xsh&st=fi3u13kn&dl=0")
  }
];

// --- Components ---

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse values
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse position to image translation (Parallax)
  // Moving mouse right moves image left (inverse)
  const xMove = useTransform(springX, [-0.5, 0.5], ["10%", "-10%"]);
  const yMove = useTransform(springY, [-0.5, 0.5], ["10%", "-10%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate normalized position (-0.5 to 0.5) from center
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={clsx(
        "relative w-full aspect-[3/2] rounded-3xl overflow-hidden cursor-none", // Changed from aspect-square to aspect-[3/2]
        "transition-transform duration-500 hover:scale-[0.98]",
        project.bgColor
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm">
          {project.icon}
        </div>
        <div>
          <h3 className={clsx("font-sans text-3xl font-bold mb-2", project.bgColor === 'bg-black' || project.bgColor === 'bg-orange-500' ? 'text-white' : 'text-ink')}>
            {project.title}
          </h3>
          <p className={clsx("font-mono text-sm uppercase tracking-wider opacity-80", project.bgColor === 'bg-black' || project.bgColor === 'bg-orange-500' ? 'text-white/80' : 'text-ink/80')}>
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Hover Image Reveal with Parallax */}
      <motion.div
        className="absolute inset-[-20%] z-20" // Negative inset to allow movement without showing edges
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          x: xMove,
          y: yMove,
        }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

const FigmaCursor: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only show cursor if inside the section
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        setIsVisible(true);
        x.set(e.clientX);
        y.set(e.clientY);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Figma Arrow SVG */}
      <div className="relative">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path 
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" 
            fill="#000" 
            stroke="white" 
            strokeWidth="1"
          />
        </svg>
        
        {/* "You" Tag */}
        <div className="absolute top-4 left-3 bg-[#000] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-sm">
          You
        </div>
      </div>
    </motion.div>
  );
};

export const RecentlyMade: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FDFCF8] px-6 py-24 md:px-20 md:py-32 z-20 cursor-none" // Hide default cursor here
    >
      <FigmaCursor containerRef={sectionRef} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="font-script text-5xl text-ink mb-2">Recently Made</h2>
            <p className="font-mono text-stone-500 uppercase tracking-widest text-sm">Selected Works 2024-2025</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
