import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene19TheGift: React.FC = () => {
  const { config, nextScene, openGift } = useStory();
  const [isOpening, setIsOpening] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  const handleOpenGift = () => {
    setIsOpening(true);
    openGift();

    // Box shakes, lid opens, then sudden cut to black!
    setTimeout(() => {
      setIsBlackout(true);
      setTimeout(() => {
        nextScene();
      }, 700);
    }, 1100);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#190e1a] via-[#09060c] to-black text-center overflow-hidden">
      {/* Sudden cut to black */}
      <AnimatePresence>
        {isBlackout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="pt-8 max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>A SPECIAL WRAPPING</span>
        </motion.div>

        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white">
          {config.gift.heading}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 italic">
          {config.gift.subtext}
        </p>
      </div>

      {/* 3D Gift Box Component */}
      <div className="my-auto flex flex-col items-center justify-center max-w-xs mx-auto w-full py-6 z-10">
        <motion.div
          animate={
            isOpening
              ? {
                  x: [0, -10, 10, -8, 8, 0],
                  scale: [1, 1.05, 1],
                }
              : {
                  scale: [1, 1.03, 1],
                }
          }
          transition={
            isOpening
              ? { duration: 0.5 }
              : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          }
          className="relative flex flex-col items-center cursor-pointer"
          onClick={handleOpenGift}
        >
          {/* Ribbon Bow */}
          <motion.div
            animate={{
              y: isOpening ? -60 : 0,
              opacity: isOpening ? 0 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="relative z-20 -mb-4 flex items-center justify-center"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md border border-amber-300" />
            <div className="absolute h-6 w-16 -rotate-15 rounded-full bg-amber-400/80 -z-10" />
            <div className="absolute h-6 w-16 rotate-15 rounded-full bg-amber-400/80 -z-10" />
          </motion.div>

          {/* Lid */}
          <motion.div
            animate={{
              y: isOpening ? -45 : 0,
              rotate: isOpening ? -8 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="relative z-10 h-11 w-44 rounded-t-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 shadow-lg border-b-2 border-rose-800 flex items-center justify-center"
          >
            {/* Horizontal ribbon on lid */}
            <div className="h-full w-7 bg-amber-400/90 shadow-sm" />
          </motion.div>

          {/* Box Body */}
          <div className="relative h-36 w-40 rounded-b-2xl bg-gradient-to-b from-rose-800 to-rose-950 shadow-2xl border-t border-rose-600/30 flex items-center justify-center overflow-hidden">
            {/* Vertical ribbon on body */}
            <div className="h-full w-7 bg-amber-400/90 shadow-inner" />
            {/* Box Glow */}
            <div className="absolute inset-0 bg-radial from-rose-400/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleOpenGift}
          disabled={isOpening}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Gift size={16} />
          <span>{config.gift.buttonText}</span>
        </button>
      </div>
    </div>
  );
};
