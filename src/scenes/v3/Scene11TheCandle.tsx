import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Wind } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const Scene11TheCandle: React.FC = () => {
  const { config, nextScene, candleExtinguished, extinguishCandle } = useStory();
  const [lineIdx, setLineIdx] = useState(0);

  const handleExtinguish = () => {
    if (candleExtinguished) {
      nextScene();
      return;
    }
    extinguishCandle();

    // Reveal thoughts in sequence
    setTimeout(() => setLineIdx(1), 700);
    setTimeout(() => setLineIdx(2), 1800);
    setTimeout(() => setLineIdx(3), 2900);
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col items-center justify-between p-6 select-none text-center transition-colors duration-1000 overflow-hidden ${
        candleExtinguished ? 'bg-[#020204]' : 'bg-radial from-[#1e1313] via-[#0d0909] to-black'
      }`}
    >
      <div className="pt-6" />

      {/* Main Experience */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10">
        {!candleExtinguished ? (
          /* Burning Candle View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] text-amber-300 font-semibold mb-3">
              <Sparkles size={11} />
              <span>CHAPTER 11 • A WISH</span>
            </div>

            <h2 className="font-cinzel text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-100 to-amber-300 mb-1">
              {config.candle.prompt}
            </h2>
            <p className="text-xs text-neutral-400 italic mb-6 max-w-xs">
              {config.candle.subtext}
            </p>

            {/* Candle Graphic with Interactive Flame & Whole Body Clickable */}
            <div
              onClick={handleExtinguish}
              className="relative flex flex-col items-center cursor-pointer group active:scale-95 transition-transform p-4"
            >
              {/* Flame Glow Aura */}
              <div className="absolute -top-12 h-44 w-44 rounded-full bg-amber-500/20 blur-3xl animate-pulse pointer-events-none" />

              {/* Flame */}
              <div className="relative mb-2 flex items-center justify-center animate-flicker">
                <div className="h-14 w-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 shadow-[0_0_25px_rgba(251,191,36,0.9)]" />
                <div className="absolute h-6 w-3 rounded-full bg-white/90" />
              </div>

              {/* Wick */}
              <div className="h-4 w-1 bg-neutral-800 rounded-t-xs" />

              {/* Candle Body */}
              <div className="relative h-44 w-16 rounded-t-lg bg-gradient-to-b from-[#f5ede0] via-[#e5d5c0] to-[#c7b59d] shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden border border-[#d8c7b0]">
                <div className="absolute top-0 left-2 h-8 w-3 bg-[#fdf9f2] rounded-b-full shadow-xs" />
                <div className="absolute top-0 right-3 h-12 w-2.5 bg-[#fdf9f2] rounded-b-full shadow-xs" />
              </div>

              {/* Candle Plate */}
              <div className="h-3 w-28 rounded-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 shadow-xl -mt-1 border border-amber-600/30" />
            </div>

            {/* Clear explicit action button */}
            <div className="mt-6 w-full max-w-xs">
              <button
                onClick={handleExtinguish}
                className="w-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wind size={16} />
                <span>TAP TO BLOW OUT FLAME</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Quiet Poetic Darkness View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-6 px-4"
          >
            {/* Extinguished Smoke Wisp */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8, y: 0 }}
              animate={{ scale: 1.5, opacity: 0, y: -40 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="h-10 w-2 rounded-full bg-white/20 blur-xs mb-2"
            />

            {lineIdx >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-200/90 tracking-wide"
              >
                {config.candle.wishThoughts[0]}
              </motion.p>
            )}

            {lineIdx >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg text-neutral-300 font-light italic"
              >
                {config.candle.wishThoughts[1]}
              </motion.p>
            )}

            {lineIdx >= 3 && (
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="font-cinzel text-3xl sm:text-4xl font-bold text-rose-300 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)]"
              >
                {config.candle.wishThoughts[2]}
              </motion.h3>
            )}
          </motion.div>
        )}
      </div>

      {/* Continue Action */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center gap-2">
        {candleExtinguished && (
          <button
            onClick={nextScene}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>THINGS I WANT TO DO WITH YOU</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
