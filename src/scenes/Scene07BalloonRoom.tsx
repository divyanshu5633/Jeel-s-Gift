import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene07BalloonRoom: React.FC = () => {
  const { config, nextScene, poppedBalloons, popBalloon } = useStory();
  const [isFlyingToCenter, setIsFlyingToCenter] = useState(false);

  const allPopped = poppedBalloons.length === config.balloons.length;

  const handlePop = (balloonId: string, event: React.MouseEvent) => {
    if (poppedBalloons.includes(balloonId)) return;

    // Small pop particle burst at balloon coordinate
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 45,
      origin: { x, y },
      colors: ['#fda4af', '#f43f5e', '#e0e7ff', '#fef08a'],
      ticks: 150,
      gravity: 0.9,
    });

    popBalloon(balloonId);
  };

  const handleContinue = () => {
    setIsFlyingToCenter(true);
    setTimeout(() => {
      nextScene();
    }, 1000);
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col justify-between p-6 select-none overflow-hidden transition-colors duration-1000 ${
        isFlyingToCenter ? 'bg-[#02020a]' : 'bg-gradient-to-b from-[#140b19] via-[#0d0914] to-[#06050b]'
      }`}
    >
      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200"
        >
          FOUR THINGS ARE HIDING HERE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-xs sm:text-sm text-neutral-400 italic"
        >
          Pop every balloon to continue. ({poppedBalloons.length} / 4 popped)
        </motion.p>
      </div>

      {/* Balloons Grid / Interactive Field */}
      <div className="relative my-auto grid grid-cols-2 gap-4 max-w-sm mx-auto w-full py-4 z-10">
        {config.balloons.map((balloon, index) => {
          const isPopped = poppedBalloons.includes(balloon.id);

          return (
            <div key={balloon.id} className="relative flex flex-col items-center justify-center min-h-[170px]">
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  /* Floating Balloon */
                  <motion.button
                    key={`balloon-${balloon.id}`}
                    initial={{ scale: 0, y: 30 }}
                    animate={{
                      scale: 1,
                      y: [0, -10, 5, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.5, delay: index * 0.1 },
                      y: { repeat: Infinity, duration: 3.5 + index * 0.5, ease: 'easeInOut' },
                      rotate: { repeat: Infinity, duration: 4 + index * 0.4, ease: 'easeInOut' },
                    }}
                    onClick={(e) => handlePop(balloon.id, e)}
                    className="group relative flex flex-col items-center focus:outline-hidden cursor-pointer"
                  >
                    {/* Balloon Body */}
                    <div
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${balloon.highlight}, ${balloon.color})`,
                        boxShadow: `0 12px 30px ${balloon.color}40`,
                      }}
                      className="relative h-28 w-24 rounded-full transition-transform group-hover:scale-105 active:scale-95 group-active:scale-90"
                    >
                      {/* Shine reflection */}
                      <span className="absolute top-4 left-4 h-6 w-3 rounded-full bg-white/40 rotate-[-30deg]" />
                    </div>

                    {/* Balloon knot & string */}
                    <div
                      style={{ backgroundColor: balloon.color }}
                      className="h-2.5 w-2.5 rotate-45 -mt-1 rounded-xs"
                    />
                    <div className="h-9 w-px bg-white/20 origin-top animate-pulse" />
                  </motion.button>
                ) : (
                  /* Revealed Card */
                  <motion.div
                    key={`revealed-${balloon.id}`}
                    initial={{ scale: 0.6, opacity: 0, y: 15 }}
                    animate={{
                      scale: isFlyingToCenter ? 0.3 : 1,
                      opacity: isFlyingToCenter ? 0 : 1,
                      x: isFlyingToCenter ? (index % 2 === 0 ? 80 : -80) : 0,
                      y: isFlyingToCenter ? 60 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-2xl bg-[#171424] border border-rose-500/30 p-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[140px]"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-rose-400">
                      {balloon.category}
                    </span>
                    <p className="mt-1.5 text-sm sm:text-base font-semibold text-white tracking-wide">
                      {balloon.content}
                    </p>
                    {balloon.subtext && (
                      <p className="mt-1 text-[11px] text-neutral-400 italic">
                        {balloon.subtext}
                      </p>
                    )}
                    <span className="mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                      <Check size={12} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Completion Banner & Next Chapter Button */}
      <div className="min-h-20 flex flex-col items-center justify-center pb-6 z-10">
        <AnimatePresence>
          {allPopped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xs text-center space-y-3"
            >
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
                <Sparkles size={14} />
                <span>All clues collected.</span>
              </div>

              <button
                onClick={handleContinue}
                className="group w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>FOLLOW THE CLUE</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
