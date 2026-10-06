import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene18TheWish: React.FC = () => {
  const { config, nextScene } = useStory();
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const total = config.wish.thoughts.length;
    const interval = setInterval(() => {
      setLineCount((prev) => {
        if (prev < total) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [config.wish.thoughts.length]);

  const allShown = lineCount >= config.wish.thoughts.length;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-8 select-none bg-black text-center overflow-hidden">
      <div className="pt-8" />

      {/* Poetic Lines Fade In */}
      <div className="my-auto flex flex-col items-center max-w-xs mx-auto w-full space-y-6">
        {config.wish.thoughts.map((line, idx) => {
          if (idx >= lineCount) return null;

          const isLast = idx === config.wish.thoughts.length - 1;

          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`font-light tracking-wide ${
                isLast
                  ? 'font-cinzel text-2xl sm:text-3xl font-semibold text-rose-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : idx === 0
                  ? 'text-lg text-neutral-200'
                  : 'text-base text-neutral-400'
              }`}
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        {allShown && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={nextScene}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>CONTINUE</span>
            <Heart size={16} className="fill-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
