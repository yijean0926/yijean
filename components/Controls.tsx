import React from 'react';
import { AnimationMode } from '../types';
import { motion } from 'framer-motion';

interface ControlsProps {
  currentMode: AnimationMode;
  setMode: (mode: AnimationMode) => void;
}

const Controls: React.FC<ControlsProps> = ({ currentMode, setMode }) => {
  const buttons = [
    { label: 'ZIGZAG', mode: AnimationMode.ZIGZAG },
    { label: 'JUMP', mode: AnimationMode.JUMP },
    { label: 'WAVE', mode: AnimationMode.WAVE },
    { label: 'STATIC', mode: AnimationMode.STATIC },
  ];

  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-3">
      {buttons.map((btn) => (
        <motion.button
          key={btn.mode}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMode(btn.mode)}
          className={`
            px-4 py-2 text-xs md:text-sm font-['Inter'] font-medium tracking-wider
            border transition-all duration-300 backdrop-blur-sm rounded-full
            ${
              currentMode === btn.mode
                ? 'bg-black text-white border-black'
                : 'bg-white/50 text-black border-gray-300 hover:border-black'
            }
          `}
        >
          {btn.label}
        </motion.button>
      ))}
    </div>
  );
};

export default Controls;