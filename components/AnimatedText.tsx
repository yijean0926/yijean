import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { AnimationMode } from '../types';

interface AnimatedTextProps {
  text: string;
  mode: AnimationMode;
  className?: string;
  fontFamily: string;
  onClick?: () => void;
}

// Singleton canvas for font checking to avoid performance overhead
const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
const ctx = canvas?.getContext('2d', { willReadFrequently: true });
const supportCache: Record<string, boolean> = {};

// Helper to check if a glyph is supported by the font
export const checkGlyphSupport = (char: string, fontStack: string): boolean => {
  // Always support whitespace
  if (!char.trim()) return true;
  // If no context (SSR/Error), assume supported
  if (!ctx) return true;

  const cacheKey = `${char}_${fontStack}`;
  if (supportCache[cacheKey] !== undefined) {
    return supportCache[cacheKey];
  }

  const size = 30;
  const baselineFont = 'monospace';
  // Note: fontStack might be "'Inter', sans-serif" so we append correctly
  const testFont = `${size}px ${fontStack}, ${baselineFont}`;
  const baselineFontStr = `${size}px ${baselineFont}`;

  // 1. Measure Widths
  ctx.font = baselineFontStr;
  const baselineWidth = ctx.measureText(char).width;

  ctx.font = testFont;
  const targetWidth = ctx.measureText(char).width;

  // If widths differ significantly, it's likely supported (custom font != monospace)
  if (Math.abs(baselineWidth - targetWidth) > 0.5) {
    supportCache[cacheKey] = true;
    return true;
  }

  // 2. Pixel Comparison (Fallback if widths are similar)
  // We draw the character in fallback font and target font and compare pixels.
  canvas!.width = size;
  canvas!.height = size;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // Draw Baseline
  ctx.clearRect(0, 0, size, size);
  ctx.font = baselineFontStr;
  ctx.fillText(char, 0, 0);
  const baselineData = ctx.getImageData(0, 0, size, size).data;

  // Draw Target
  ctx.clearRect(0, 0, size, size);
  ctx.font = testFont;
  ctx.fillText(char, 0, 0);
  const targetData = ctx.getImageData(0, 0, size, size).data;

  // Compare pixel data
  let isDifferent = false;
  const len = baselineData.length;
  for (let i = 0; i < len; i++) {
    if (baselineData[i] !== targetData[i]) {
      isDifferent = true;
      break;
    }
  }

  supportCache[cacheKey] = isDifferent;
  return isDifferent;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, mode, className, fontFamily, onClick }) => {
  // Use Array.from to correctly handle unicode characters (surrogate pairs)
  const characters = Array.from(text);

  const containerVariants: Variants = {
    static: {},
    zigzag: {
      transition: { staggerChildren: 0.05 }
    },
    jump: {
      transition: { staggerChildren: 0.05 }
    },
    wave: {
      transition: { staggerChildren: 0.05 }
    }
  };

  const charVariants: Variants = {
    static: { y: 0, x: 0, rotate: 0, scale: 1 },
    zigzag: {
      x: [-2, 2, -2],
      transition: {
        x: {
          repeat: Infinity,
          duration: 0.3,
          ease: "linear"
        }
      }
    },
    jump: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.6,
          ease: "circOut"
        },
        scale: {
            repeat: Infinity,
            duration: 0.6
        }
      }
    },
    wave: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`relative inline-block ${className} cursor-pointer select-none hover:text-[#0000FF] transition-colors duration-300`}
      style={{ fontFamily }}
      variants={containerVariants}
      initial="static"
      animate={mode}
      onClick={onClick}
    >
      {characters.map((char, index) => {
        const isSupported = checkGlyphSupport(char, fontFamily);
        return (
          <motion.span
            key={`${index}-${char}`}
            variants={charVariants}
            style={{ 
              display: 'inline-block', 
              minWidth: char === ' ' ? '0.3em' : 'auto',
              // Hide unsupported glyphs to show as "blank" instead of fallback tofu
              opacity: isSupported ? 1 : 0
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedText;