import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene02TheWarning: React.FC = () => {
  const { config, nextScene } = useStory();
  const [lineIndex, setLineIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLineIndex(1), 1000);
    const t2 = setTimeout(() => setLineIndex(2), 2600);
    const t3 = setTimeout(() => setLineIndex(3), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleReady = () => {
    sounds.playHeartbeat();
    setIsFlashing(true);
    setTimeout(() => {
      nextScene();
    }, 450);
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-8 text-center select-none bg-black overflow-hidden">
      {/* Soft white flash on tap */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none fixed inset-0 z-50 bg-white"
          />
        )}
      </AnimatePresence>

      <div className="pt-8" />

      {/* Sequential message lines */}
      <div className="flex flex-col items-center my-auto space-y-7 max-w-xs">
        {lineIndex >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-neutral-400 font-light"
          >
            {config.warning.lines[0]}
          </motion.p>
        )}

        {lineIndex >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-medium text-white tracking-wide"
          >
            <Headphones size={24} className="text-rose-400 animate-pulse" />
            <span>{config.warning.lines[1]}</span>
          </motion.div>
        )}

        {lineIndex >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-base text-rose-200/90 font-light">
              {config.warning.lines[2]}
            </p>
            <p className="text-xs text-neutral-500 italic">
              {config.warning.subtext}
            </p>
          </motion.div>
        )}
      </div>

      {/* Button with subtle heartbeat */}
      <div className="w-full max-w-xs pb-6">
        {lineIndex >= 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: [1, 1.03, 1, 1.02, 1],
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
            }}
            onClick={handleReady}
            className="group relative w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{config.warning.buttonText}</span>
            <Heart size={16} className="text-white fill-white/80 animate-ping" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
