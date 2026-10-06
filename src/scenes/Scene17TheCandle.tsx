import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene17TheCandle: React.FC = () => {
  const { config, nextScene, candleExtinguished, extinguishCandle } = useStory();
  const [tapCount, setTapCount] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowFlame = () => {
    if (candleExtinguished) return;

    const newCount = tapCount + 1;
    setTapCount(newCount);
    setIsBlowing(true);

    setTimeout(() => {
      setIsBlowing(false);
    }, 300);

    // After 3 taps or a solid interaction, extinguish the candle!
    if (newCount >= 3) {
      extinguishCandle();
      setTimeout(() => {
        nextScene();
      }, 1000);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-black text-center overflow-hidden">
      {/* Dark room atmosphere */}
      <div className="pt-8 max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>A SACRED MOMENT</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white">
          {config.wish.candlePrompt}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 italic">
          {config.wish.candleSubtext}
        </p>
      </div>

      {/* Birthday / Anniversary Cake & Interactive Candle */}
      <div className="my-auto flex flex-col items-center justify-center max-w-xs mx-auto w-full py-4 z-10">
        {/* Interactive Candle */}
        <div
          onClick={handleBlowFlame}
          className="relative flex flex-col items-center cursor-pointer group active:scale-95"
        >
          {/* Flame & Glow */}
          <AnimatePresence>
            {!candleExtinguished ? (
              <motion.div
                key="flame"
                animate={{
                  scale: isBlowing ? [0.6, 1.2, 0.4] : [1, 1.1, 0.95, 1],
                  rotate: isBlowing ? [0, 20, -20, 0] : [0, 2, -2, 0],
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.3 },
                }}
                className="relative flex flex-col items-center"
              >
                {/* Flame Halo */}
                <div className="absolute -inset-6 rounded-full bg-amber-500/30 blur-2xl animate-pulse" />

                {/* Outer Flame */}
                <div className="h-14 w-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flicker shadow-[0_0_25px_rgba(251,191,36,0.9)] relative">
                  {/* Inner Blue Core */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-4 w-3 rounded-full bg-blue-400/80 blur-[1px]" />
                </div>
              </motion.div>
            ) : (
              /* Smoke trail after extinguishment */
              <motion.div
                key="smoke"
                initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -40, scale: 2 }}
                transition={{ duration: 1.2 }}
                className="h-8 w-2 rounded-full bg-neutral-400 blur-sm"
              />
            )}
          </AnimatePresence>

          {/* Candle Wick */}
          <div className="h-4 w-1 bg-neutral-800 -mt-1" />

          {/* Candle Wax Body */}
          <div className="h-28 w-8 rounded-t-lg bg-gradient-to-r from-rose-200 via-rose-100 to-rose-300 shadow-md border border-rose-200 flex flex-col items-center justify-between p-1">
            <span className="h-2 w-2 rounded-full bg-rose-400/40" />
            <span className="h-2 w-2 rounded-full bg-rose-400/40" />
          </div>

          {/* Cake Top Tier */}
          <div className="h-12 w-44 rounded-t-2xl bg-gradient-to-r from-[#2a1a2b] via-[#3d243e] to-[#2a1a2b] border-t-4 border-rose-300 shadow-inner flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300/80">
              For {config.recipient}
            </span>
          </div>

          {/* Cake Bottom Tier */}
          <div className="h-16 w-56 rounded-b-2xl bg-gradient-to-r from-[#1c121e] via-[#2a1b2d] to-[#1c121e] border-t-2 border-rose-400/40 shadow-2xl flex items-center justify-around px-4">
            <Sparkles size={14} className="text-amber-400/60" />
            <Sparkles size={14} className="text-rose-400/60" />
            <Sparkles size={14} className="text-amber-400/60" />
          </div>
        </div>

        {/* Tap Prompt */}
        {!candleExtinguished && (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="mt-6 flex items-center gap-1.5 text-xs text-neutral-400"
          >
            <Wind size={13} className="text-amber-300" />
            <span>Tap flame to blow out candle ({3 - tapCount} left)</span>
          </motion.div>
        )}
      </div>

      <div className="pb-6" />
    </div>
  );
};
