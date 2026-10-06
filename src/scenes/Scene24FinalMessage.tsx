import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useStory } from '../context/StoryContext';

export const Scene24FinalMessage: React.FC = () => {
  const { config, nextScene } = useStory();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2800);
    const t3 = setTimeout(() => setStep(3), 4400);
    const t4 = setTimeout(() => setStep(4), 6200);
    const t5 = setTimeout(() => setStep(5), 8400);

    // Auto-advance after quiet emotional pause
    const t6 = setTimeout(() => {
      nextScene();
    }, 11500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [nextScene]);

  return (
    <div
      onClick={nextScene}
      className="relative flex min-h-dvh flex-col items-center justify-center p-8 select-none bg-black text-center cursor-pointer"
    >
      <div className="flex flex-col items-center max-w-sm mx-auto space-y-7">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-base sm:text-lg font-light text-neutral-400"
          >
            {config.final.lines[0]}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-base sm:text-lg font-light text-neutral-400"
          >
            {config.final.lines[1]}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-base sm:text-lg font-light text-neutral-400"
          >
            {config.final.lines[2]}
          </motion.p>
        )}

        {step >= 4 && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="pt-4 font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide"
          >
            {config.final.mainHeading}
          </motion.h2>
        )}

        {step >= 5 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="font-cinzel text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 drop-shadow-[0_0_35px_rgba(244,63,94,0.7)]"
          >
            {config.final.youHeading}
          </motion.h1>
        )}
      </div>

      <p className="absolute bottom-6 text-[10px] text-neutral-600 uppercase tracking-widest">
        tap anywhere to continue
      </p>
    </div>
  );
};
