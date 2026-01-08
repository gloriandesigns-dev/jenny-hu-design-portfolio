import React, { useState } from 'react';
import { Link, Command } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---
interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  backType: 'image' | 'text';
  backContent: string;
}

// --- Data ---
const db = (url: string) => url.replace('dl=0', 'dl=1');

const WORKS: WorkItem[] = [
  {
    id: 'alora',
    title: 'Alora',
    subtitle: 'Chrome extension | 2020',
    description: 'Personal data management and data tracking transparency.',
    thumbnail: db('https://www.dropbox.com/scl/fi/aqiux58sso0s3ge4861mz/iB6uzsB6l2paDhNKJwSzJyvDSzw.avif?rlkey=4m4es9u0farxc8471khxoujjb&st=edvdgrv5&dl=0'),
    backType: 'image',
    backContent: db('https://www.dropbox.com/scl/fi/8e3w7qdlwq9ebirkia4j6/Untitled-1-3x.webp?rlkey=b53gfigygmapcfc3bvoi3ielb&st=jmigdw2o&dl=0')
  },
  {
    id: 'nba',
    title: 'NBA Fan Zone',
    subtitle: 'AKQA Summer Internship | 2017',
    description: 'The official loyalty HUB of the NBA for China’s fans.',
    thumbnail: db('https://www.dropbox.com/scl/fi/s1yuoh508592y1ehovs3o/xleyZ28tx2lxtCNCKRFTGYdUqTI.avif?rlkey=urh5mx9nlmnwerrj1w7383561&st=9tsrmccf&dl=0'),
    backType: 'image',
    backContent: db('https://www.dropbox.com/scl/fi/s1yuoh508592y1ehovs3o/xleyZ28tx2lxtCNCKRFTGYdUqTI.avif?rlkey=urh5mx9nlmnwerrj1w7383561&st=9tsrmccf&dl=0')
  },
  {
    id: '100days',
    title: '100 Days of UI',
    subtitle: 'User Interface | 2020',
    description: 'Daily Design Challenge on Dribbble',
    thumbnail: db('https://www.dropbox.com/scl/fi/y77o2h3iwl6z6hxuoibio/mqKjnAfYlJoPjLE80JkaFFBYGyE.avif?rlkey=7qpp2vzeodptps5guw8ntdfwm&st=ldcx3qtr&dl=0'),
    backType: 'text',
    backContent: '100 Days of UI was a design challenge I took on during the COVID quarantine. It gave me the opportunity to explore different UI patterns—what some might call “organisms”—and rethink creative alternatives to more conventional design solutions.'
  },
  {
    id: 'oddio',
    title: 'Oddio',
    subtitle: 'Project @ CMU MHCI | 2020',
    description: 'A new audio-based social network with an endless feed',
    thumbnail: db('https://www.dropbox.com/scl/fi/5l5mcm115626mkxfsg2hg/NhreDx8SlTfulVIsJ34VmaolzQ.avif?rlkey=o0rflecwef5wj3utlvyvt4rar&st=eri6xt3b&dl=0'),
    backType: 'image',
    backContent: db('https://www.dropbox.com/scl/fi/8frn8lpy0fe2mqrxb52vn/vzEazRVQV74hjNvzYBxjKp4Q8.avif?rlkey=g5ojx3hlicd6ukfj8dh7kozt0&st=9okkjgp6&dl=0')
  },
];

// --- Components ---

const WorkCard: React.FC<{ work: WorkItem }> = ({ work }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[520px] lg:h-[280px] perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#FAF9F6] border border-[#EBEAE5] rounded-[32px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] group-hover:shadow-lg transition-shadow duration-300 flex flex-col lg:flex-row"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Left/Top: Thumbnail */}
          <div className="w-full h-[45%] lg:w-[40%] lg:h-full flex items-center justify-center p-6 lg:pt-[30px] lg:pb-[30px] lg:pl-[35px] lg:pr-[10px]">
            {/* Updated container to be w-full h-full to fill the padded area, removing aspect-square restriction */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={work.thumbnail} 
                alt={work.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right/Bottom: Content */}
          <div className="w-full h-[55%] lg:w-[60%] lg:h-full p-8 lg:pl-4 flex flex-col justify-between">
            <div>
              <h3 className="font-mono font-bold text-[24px] lg:text-[20px] text-[#2A2A2A] mb-2 lg:mb-1 leading-none tracking-tight">
                {work.title}
              </h3>
              <p className="font-mono text-[14px] lg:text-[12px] text-[#9CA3AF] mb-6 lg:mb-5 tracking-wide">
                {work.subtitle}
              </p>
              <div className="w-8 h-[1px] bg-[#E5E5E5] mb-6 lg:mb-5" />
              <p className="font-mono text-[#666666] text-[16px] lg:text-[14px] leading-[1.6] pr-4">
                {work.description}
              </p>
            </div>
            
            <div className="text-[#D4D4D4] group-hover:text-[#2A2A2A] transition-colors duration-300 self-start mt-auto lg:mt-0">
              <Link size={20} strokeWidth={2} className="transform -rotate-45" />
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[32px] overflow-hidden shadow-xl bg-[#FAF9F6] border border-[#EBEAE5]"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            paddingTop: '30px',
            paddingBottom: '30px',
            paddingLeft: '35px',
            paddingRight: '35px'
          }}
        >
          {work.backType === 'image' ? (
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner">
                <img 
                  src={work.backContent} 
                  alt={`${work.title} Preview`} 
                  className="w-full h-full object-cover"
                />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl p-6 shadow-inner border border-stone-100">
              <p className="font-mono text-[14px] text-[#666666] leading-relaxed text-center">
                {work.backContent}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const OtherWork: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FDFCF8] px-6 py-20 md:px-20 z-20 pb-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-mono text-xl text-ink font-bold flex items-center gap-2 tracking-tight">
            Other Work <span className="text-stone-400 font-normal">*</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {WORKS.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {/* About Section (Footer) */}
        <div className="max-w-3xl">
          <h2 className="font-mono text-xl text-ink font-bold mb-8 flex items-center gap-3 tracking-tight">
            About <Command size={18} className="text-stone-400" />
          </h2>
          
          <div className="space-y-6 font-mono text-[14px] text-stone-600 leading-relaxed">
            <p>
              I'm a product designer(she/her) who loves crafting meaningful interactions and bringing fun ideas to life. Currently based in Paris, France.
            </p>
            <p>
              While I value the aesthetic and emotional aspects of design, my recent work has centered on leveraging design psychology to achieve measurable user and business outcomes.
            </p>
            <p>
              Before relocating to France, I earned my Master's in Human-Computer Interaction from Carnegie Mellon University and a B.S. in Interactive Media Arts from NYU Shanghai.
            </p>
            <p>
              I design to make people smile :D.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200 font-mono text-xs text-stone-400 flex gap-4">
            <a href="#" className="hover:text-ink transition-colors">LinkedIn</a>
            <span>|</span>
            <a href="#" className="hover:text-ink transition-colors">Twitter (x)</a>
            <span>|</span>
            <span>E-mail: jennyhu.design@gmail.com</span>
          </div>
        </div>

      </div>
    </section>
  );
};
