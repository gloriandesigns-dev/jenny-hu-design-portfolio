import React, { useState } from 'react';
import { Coffee, Eraser, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ASSETS, Mode } from './assets';
import { FloatingElement } from './components/FloatingElement';
import { CursorTrail } from './components/CursorTrail';
import { RecentlyMade } from './components/RecentlyMade';
import { OtherWork } from './components/OtherWork';

function App() {
  const [mode, setMode] = useState<Mode>('chaos');

  const modes = [
    { id: 'chaos', icon: Coffee, label: 'Chaos' },
    { id: 'clean', icon: Eraser, label: 'Cleaned Up' },
    { id: 'notebook', icon: PenTool, label: 'Notebook' },
  ];

  return (
    // Main container with scrolling enabled
    <div className="relative w-full min-h-screen bg-cream selection:bg-yellow-200 selection:text-ink overflow-x-hidden">
      
      {/* HERO SECTION - Full Height */}
      <section className="relative w-full h-screen overflow-hidden z-10">
        
        {/* Notebook Mode Cursor Trail */}
        {mode === 'notebook' && <CursorTrail />}

        {/* Floating Assets Layer */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          {ASSETS.map(asset => (
            <FloatingElement 
              key={asset.id} 
              asset={asset} 
              mode={mode} 
            />
          ))}
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-50 w-full h-full pointer-events-none flex flex-col items-center justify-center">
          
          {/* Title Block */}
          <motion.div 
            layout
            className="pointer-events-auto bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm p-8 text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <motion.h1 
              layout
              className="font-script text-[5rem] md:text-[7rem] leading-none text-ink transform -rotate-2 whitespace-nowrap"
            >
              Jenny Hu
            </motion.h1>
          </motion.div>

          {/* Description Block */}
          <motion.div 
            layout
            className="pointer-events-auto bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm p-8 text-center flex flex-col items-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.h2 layout className="font-mono text-sm tracking-widest uppercase text-stone-500 mb-4">
              Product Design
            </motion.h2>
            <motion.p layout className="font-sans text-lg text-stone-600 leading-relaxed">
              a thoughtful practice of shaping digital experiences that invite curiosity, create clarity, and spark quiet delight.
            </motion.p>
          </motion.div>

          {/* Mode Switcher */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-auto">
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-stone-200/50 shadow-sm">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id as Mode)}
                    className={clsx(
                      "p-3 rounded-xl transition-all duration-300 ease-out group relative",
                      isActive ? "bg-white shadow-md text-ink scale-110" : "text-stone-400 hover:text-stone-600 hover:bg-white/50"
                    )}
                    aria-label={m.label}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY MADE SECTION */}
      <RecentlyMade />

      {/* OTHER WORK SECTION */}
      <OtherWork />

    </div>
  );
}

export default App;
