import React, { useState } from 'react';
import { Coffee, Eraser, PenTool, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ASSETS, Mode } from './assets';
import { FloatingElement } from './components/FloatingElement';
import { CursorTrail } from './components/CursorTrail';

function App() {
  const [mode, setMode] = useState<Mode>('chaos');

  const modes = [
    { id: 'chaos', icon: Coffee, label: 'Chaos' },
    { id: 'clean', icon: Eraser, label: 'Cleaned Up' },
    { id: 'notebook', icon: PenTool, label: 'Notebook' },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cream selection:bg-yellow-200 selection:text-ink">
      
      {/* Notebook Mode Cursor Trail */}
      {mode === 'notebook' && <CursorTrail />}

      {/* Floating Assets Layer */}
      <div className="absolute inset-0 z-0">
        {ASSETS.map(asset => (
          <FloatingElement 
            key={asset.id} 
            asset={asset} 
            mode={mode} 
          />
        ))}
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-50 flex flex-col items-center justify-center h-full pointer-events-none">
        
        {/* Main Typography */}
        <motion.div 
          className="text-center space-y-6 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-script text-[5rem] md:text-[7rem] leading-none text-ink transform -rotate-2">
            Jenny Hu
          </h1>
          
          <div className="space-y-2">
            <h2 className="font-mono text-sm tracking-widest uppercase text-stone-500">
              Product Design
            </h2>
            <p className="font-mono text-xs italic text-stone-400">
              Verb & Noun
            </p>
          </div>

          <div className="max-w-xl mx-auto mt-8 px-4">
            <p className="font-mono text-sm md:text-base leading-relaxed text-stone-600">
              a thoughtful practice of shaping digital experiences that invite curiosity, create clarity, and spark quiet delight.
            </p>
          </div>
        </motion.div>

        {/* Mode Switcher */}
        <div className="absolute bottom-10 flex flex-col items-center gap-8 pointer-events-auto">
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

          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-stone-300"
          >
            <ArrowDown size={20} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

    </div>
  );
}

export default App;
