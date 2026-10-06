import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, ArrowRight } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene10TheLastGift: React.FC = () => {
  const { config, nextScene, openGift } = useStory();
  const [isOpening, setIsOpening] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);

  const handleOpen = () => {
    setIsOpening(true);
    openGift();

    // Box shakes, lid opens, then blackout!
    setTimeout(() => {
      setIsBlackout(true);
      sounds.startAmbientMusic('reveal'); // Key change to brighter emotional reveal theme!

      // Text appears in darkness
      setTimeout(() => setLineIdx(1), 800);
      setTimeout(() => setLineIdx(2), 2400);
    }, 1100);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-black text-center overflow-hidden">
      <div className="pt-6" />

      {!isBlackout ? (
        /* Gift Box */
        <div className="my-auto flex flex-col items-center max-w-xs mx-auto w-full z-10">
          <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white mb-8">
            {config.gift.heading}
          </h2>

          <motion.div
            animate={
              isOpening
                ? { x: [0, -10, 10, -6, 6, 0], scale: [1, 1.05, 1] }
                : { scale: [1, 1.03, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.5 }
                : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }
            onClick={handleOpen}
            className="cursor-pointer flex flex-col items-center"
          >
            {/* Bow */}
            <motion.div
              animate={{ y: isOpening ? -60 : 0, opacity: isOpening ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 -mb-4 flex items-center justify-center"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md border border-amber-300" />
              <div className="absolute h-5 w-14 -rotate-15 rounded-full bg-amber-400/80 -z-10" />
              <div className="absolute h-5 w-14 rotate-15 rounded-full bg-amber-400/80 -z-10" />
            </motion.div>

            {/* Lid */}
            <motion.div
              animate={{ y: isOpening ? -40 : 0, rotate: isOpening ? -8 : 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 h-10 w-40 rounded-t-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 shadow-lg flex items-center justify-center"
            >
              <div className="h-full w-6 bg-amber-400/90 shadow-sm" />
            </motion.div>

            {/* Box Body */}
            <div className="relative h-32 w-36 rounded-b-2xl bg-gradient-to-b from-rose-800 to-rose-950 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="h-full w-6 bg-amber-400/90 shadow-inner" />
            </div>
          </motion.div>

          <div className="mt-10 w-full max-w-xs">
            <button
              onClick={handleOpen}
              disabled={isOpening}
              className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <Gift size={16} />
              <span>{config.gift.buttonText}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Dramatic Blackout & Misdirection */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-auto flex flex-col items-center max-w-xs mx-auto w-full space-y-7 z-10"
        >
          {lineIdx >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg text-neutral-400 font-light"
            >
              {config.gift.misdirectionLines[0]}
            </motion.p>
          )}

          {lineIdx >= 2 && (
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="font-cinzel text-3xl font-bold text-rose-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]"
            >
              {config.gift.misdirectionLines[1]}
            </motion.h3>
          )}

          {lineIdx >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 w-full"
            >
              <button
                onClick={nextScene}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span>SEE WHAT'S NEXT</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="pb-6" />
    </div>
  );
};
