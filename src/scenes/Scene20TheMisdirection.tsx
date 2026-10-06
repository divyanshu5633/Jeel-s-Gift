import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene20TheMisdirection: React.FC = () => {
  const { config, nextScene } = useStory();
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLineIndex(1), 1000);
    const t2 = setTimeout(() => setLineIndex(2), 2600);
    const t3 = setTimeout(() => setLineIndex(3), 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-8 select-none bg-black text-center overflow-hidden">
      <div className="pt-8" />

      {/* Dramatic Sequential Text */}
      <div className="my-auto flex flex-col items-center max-w-xs mx-auto w-full space-y-7">
        {lineIndex >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-neutral-400 font-light"
          >
            {config.gift.misdirectionLines[0]}
          </motion.p>
        )}

        {lineIndex >= 2 && (
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl font-bold text-white tracking-widest"
          >
            {config.gift.misdirectionLines[1]}
          </motion.h3>
        )}

        {lineIndex >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-cinzel text-xl text-rose-300 font-semibold tracking-wide drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">
              {config.gift.misdirectionLines[2]}
            </p>
          </motion.div>
        )}
      </div>

      {/* Action Button */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        {lineIndex >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={nextScene}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>REVEAL THE TRUTH</span>
            <Sparkles size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
