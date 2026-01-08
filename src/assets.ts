// Asset Configuration and Coordinate Mapping

export type Mode = 'chaos' | 'clean' | 'notebook';

export interface Position {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  rotate: number;
  scale: number;
  zIndex: number;
  opacity?: number;
}

export interface AssetConfig {
  id: string;
  src: string;
  alt: string;
  type: 'image' | 'vinyl';
  sound?: string;
  modes: {
    chaos: Position;
    clean: Position;
    notebook: Position;
  };
}

const db = (url: string) => url.replace('dl=0', 'dl=1');

// Restoring explicit coordinates for all modes
export const ASSETS: AssetConfig[] = [
  {
    id: 'notebook',
    src: db('https://www.dropbox.com/scl/fi/5y85gyznjikelfzjwggvi/envato-labs-image-edit-33.webp?rlkey=pml9h1r4d40gvqu3yaes08srq&st=r54rtmqj&dl=0'),
    alt: 'Open Grid Notebook',
    type: 'image',
    modes: {
      chaos: { top: '35%', left: '-15%', rotate: -5, scale: 0.85, zIndex: 5 },
      clean: { top: '20%', left: '10%', rotate: -2, scale: 0.9, zIndex: 5 },
      notebook: { top: '50%', left: '50%', rotate: 0, scale: 1.2, zIndex: 10 }, // Center stage in notebook mode
    }
  },
  {
    id: 'lamp',
    src: db('https://www.dropbox.com/scl/fi/mstpqp1w15sa7rg0sn6vm/envato-labs-image-edit-34.webp?rlkey=ywwodhnam3kxggg0xqb7dajin&st=v40msqm6&dl=0'),
    alt: 'Red Lamp',
    type: 'image',
    modes: {
      chaos: { top: '-5%', left: '-2%', rotate: 0, scale: 0.9, zIndex: 10 },
      clean: { top: '5%', left: '5%', rotate: 0, scale: 0.8, zIndex: 10 },
      notebook: { top: '10%', left: '10%', rotate: 15, scale: 0.6, zIndex: 5 },
    }
  },
  {
    id: 'paper',
    src: db('https://www.dropbox.com/scl/fi/qrz7jt6ivi8p3bprb2ykd/envato-labs-image-edit-24.webp?rlkey=x1zoxz60dkdt1ajc980eskmy0&st=ma6gd7r5&dl=0'),
    alt: 'Dreams Paper Scrap',
    type: 'image',
    modes: {
      chaos: { top: '15%', left: '5%', rotate: -8, scale: 0.5, zIndex: 8 },
      clean: { top: '15%', left: '25%', rotate: 5, scale: 0.5, zIndex: 8 },
      notebook: { top: '20%', left: '80%', rotate: -10, scale: 0.4, zIndex: 2 },
    }
  },
  {
    id: 'stain',
    src: db('https://www.dropbox.com/scl/fi/zm7yhj98qrefpi53s2t55/envato-labs-image-edit-32.webp?rlkey=a7pfkookikt3sel9858wt0z5q&st=vtjdrjie&dl=0'),
    alt: 'Coffee Stain',
    type: 'image',
    modes: {
      chaos: { bottom: '15%', left: '-5%', rotate: 0, scale: 0.8, zIndex: 2 },
      clean: { bottom: '10%', left: '10%', rotate: 0, scale: 0.7, zIndex: 2 },
      notebook: { bottom: '5%', left: '5%', rotate: 0, scale: 0.6, zIndex: 1 },
    }
  },
  {
    id: 'film',
    src: db('https://www.dropbox.com/scl/fi/456urdmr5pyh3ks3iyqz7/envato-labs-image-edit-25.webp?rlkey=gdk17vz9wjbypo60iiwi7jo47&st=qdcsy8x5&dl=0'),
    alt: 'Kodak Film',
    type: 'image',
    modes: {
      chaos: { top: '65%', left: '2%', rotate: -15, scale: 0.6, zIndex: 20 },
      clean: { top: '70%', left: '5%', rotate: -5, scale: 0.6, zIndex: 20 },
      notebook: { top: '80%', left: '15%', rotate: 10, scale: 0.5, zIndex: 3 },
    }
  },
  {
    id: 'lighter',
    src: db('https://www.dropbox.com/scl/fi/h68zayl50vqasddbksqcw/envato-labs-image-edit-27.webp?rlkey=7tu10bipuhqtjqrbsi0h3slzh&st=exc660pd&dl=0'),
    alt: 'Lighter',
    type: 'image',
    modes: {
      chaos: { top: '80%', left: '15%', rotate: 25, scale: 0.5, zIndex: 25 },
      clean: { top: '80%', left: '20%', rotate: 90, scale: 0.5, zIndex: 25 },
      notebook: { top: '85%', left: '85%', rotate: 45, scale: 0.4, zIndex: 4 },
    }
  },
  {
    id: 'pen',
    src: db('https://www.dropbox.com/scl/fi/tro3wrmq1g8izaf18zcnr/envato-labs-image-edit-23.webp?rlkey=4xaigukvggqcwzhbe200xlbsz&st=d47ir166&dl=0'),
    alt: 'Pen',
    type: 'image',
    modes: {
      chaos: { top: '15%', left: '20%', rotate: 5, scale: 0.6, zIndex: 30 },
      clean: { top: '35%', left: '18%', rotate: 45, scale: 0.6, zIndex: 30 },
      notebook: { top: '50%', left: '75%', rotate: -15, scale: 0.7, zIndex: 15 },
    }
  },
  {
    id: 'tube',
    src: db('https://www.dropbox.com/scl/fi/pmk9e6hjlzhtxpb208i7m/envato-labs-image-edit-30.webp?rlkey=vkdx1zyqeic9w3mwyxnxixshr&st=tr5xs3ai&dl=0'),
    alt: 'Blue Paint Tube',
    type: 'image',
    modes: {
      chaos: { bottom: '2%', left: '8%', rotate: -10, scale: 0.6, zIndex: 12 },
      clean: { bottom: '5%', left: '25%', rotate: -45, scale: 0.6, zIndex: 12 },
      notebook: { bottom: '10%', left: '90%', rotate: 0, scale: 0.5, zIndex: 2 },
    }
  },
  {
    id: 'keyboard',
    // Updated to the new image URL (edit-29) as requested
    src: db('https://www.dropbox.com/scl/fi/4hezf3t6ochfg2oi3gvm1/envato-labs-image-edit-29.webp?rlkey=qy0gvef93rhcgv4pjlfdhfbkz&st=mipm6ymw&dl=0'),
    alt: 'Typewriter',
    type: 'image', 
    modes: {
      chaos: { top: '50%', right: '2%', rotate: 2, scale: 0.8, zIndex: 18 },
      clean: { top: '20%', right: '5%', rotate: 0, scale: 0.8, zIndex: 18 },
      notebook: { top: '10%', right: '10%', rotate: -5, scale: 0.6, zIndex: 5 },
    }
  },
  {
    id: 'folder',
    src: db('https://www.dropbox.com/scl/fi/frzefri07sq2v4aala09j/envato-labs-image-edit-28.webp?rlkey=senxcvjm29wbebb6kxr9azook&st=fzm8u8lz&dl=0'),
    alt: 'Blue Folder',
    type: 'image',
    modes: {
      chaos: { top: '25%', right: '5%', rotate: -12, scale: 0.7, zIndex: 14 },
      clean: { top: '45%', right: '8%', rotate: 5, scale: 0.7, zIndex: 14 },
      notebook: { top: '30%', right: '15%', rotate: 10, scale: 0.5, zIndex: 4 },
    }
  },
  {
    id: 'airdrop',
    src: db('https://www.dropbox.com/scl/fi/ghbqn4xkw8iuxcumzamee/envato-labs-image-edit-31.webp?rlkey=omsqlfyxjwroy78sicggnbw10&st=e5d47ust&dl=0'),
    alt: 'AirDrop Window',
    type: 'image',
    modes: {
      chaos: { bottom: '10%', right: '2%', rotate: 8, scale: 0.65, zIndex: 22 },
      clean: { bottom: '20%', right: '10%', rotate: 0, scale: 0.65, zIndex: 22 },
      notebook: { bottom: '15%', right: '5%', rotate: -5, scale: 0.5, zIndex: 3 },
    }
  },
  {
    id: 'cursor',
    src: db('https://www.dropbox.com/scl/fi/mjoqos4tnhhibhi1frqx4/envato-labs-image-edit-21.webp?rlkey=ti7sc2d1p2msaax7603vii4ft&st=zbgz08ef&dl=0'),
    alt: 'Pixel Cursor',
    type: 'image',
    modes: {
      chaos: { top: '10%', right: '15%', rotate: -15, scale: 0.8, zIndex: 40 },
      clean: { top: '15%', right: '20%', rotate: -15, scale: 0.8, zIndex: 40 },
      notebook: { top: '5%', right: '25%', rotate: 0, scale: 0.6, zIndex: 2 },
    }
  },
  {
    id: 'vinyl',
    // This remains the interactive vinyl player (edit-22)
    src: db('https://www.dropbox.com/scl/fi/crci1i52ywcd1zpf4nnfv/envato-labs-image-edit-22.webp?rlkey=kgsd1vitxkas2bmgrwy74oca5&st=65emx4bl&dl=0'),
    alt: 'Vinyl Record',
    type: 'vinyl',
    modes: {
      chaos: { top: '2%', right: '1%', rotate: 15, scale: 0.7, zIndex: 15 },
      clean: { top: '5%', right: '25%', rotate: 0, scale: 0.6, zIndex: 15 },
      notebook: { top: '80%', right: '20%', rotate: 45, scale: 0.5, zIndex: 5 },
    }
  },
];
