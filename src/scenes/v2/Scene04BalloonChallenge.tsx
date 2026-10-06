import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Check } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const Scene04BalloonChallenge: React.FC = () => {
  const { config, nextScene, poppedBalloons, popBalloon } = useStory();
  const [isSkyAscending, setIsSkyAscending] = useState(false);

  const allPopped = poppedBalloons.length === config.balloons.length;

  const handlePop = (balloonId: string, event: React.MouseEvent) => {
    if (poppedBalloons.includes(balloonId)) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      spread: 40,
      origin: { x, y },
      colors: ['#fda4af', '#f43f5e', '#fef08a'],
      ticks: 120,
    });

    popBalloon(balloonId);

    // If this was the last balloon, auto proceed into night sky!
    if (poppedBalloons.length + 1 === config.balloons.length) {
      setTimeout(() => {
        setIsSkyAscending(true);
        setTimeout(() => {
          nextScene();
        }, 1100);
      }, 1400);
    }
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col justify-between p-6 select-none overflow-hidden transition-colors duration-1000 ${
        isSkyAscending ? 'bg-[#030209]' : 'bg-radial from-[#150a18] via-[#09060f] to-black'
      }`}
    >
      {/* Header */}
      <div
        className={`pt-6 text-center max-w-sm mx-auto w-full z-10 transition-all duration-700 ${
          isSkyAscending ? '-translate-y-20 opacity-0' : ''
        }`}
      >
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          FOUR THINGS ARE HIDING HERE.
        </h2>
        <p className="mt-1.5 text-xs text-neutral-400 italic">
          Find them. Tap each balloon to reveal.
        </p>
      </div>

      {/* 4 Interactive Balloons Grid */}
      <div className="relative my-auto grid grid-cols-2 gap-4 max-w-sm mx-auto w-full py-2 z-10">
        {config.balloons.map((balloon, index) => {
          const isPopped = poppedBalloons.includes(balloon.id);

          return (
            <div key={balloon.id} className="relative flex flex-col items-center justify-center min-h-[160px]">
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  <motion.button
                    key={`balloon-${balloon.id}`}
                    initial={{ scale: 0, y: 30 }}
                    animate={{
                      scale: 1,
                      y: [0, -10, 6, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    exit={{ scale: 1.3, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.4, delay: index * 0.08 },
                      y: { repeat: Infinity, duration: 3.2 + index * 0.4, ease: 'easeInOut' },
                      rotate: { repeat: Infinity, duration: 3.8 + index * 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handlePop(balloon.id, e)}
                    className="group relative flex flex-col items-center cursor-pointer"
                  >
                    {/* Balloon Body */}
                    <div
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${balloon.highlight}, ${balloon.color})`,
                        boxShadow: `0 10px 25px ${balloon.color}45`,
                      }}
                      className="relative h-26 w-22 rounded-full transition-transform group-hover:scale-105 active:scale-90"
                    >
                      <span className="absolute top-3 left-3 h-5 w-2.5 rounded-full bg-white/40 rotate-[-30deg]" />
                    </div>

                    {/* Knot & String */}
                    <div
                      style={{ backgroundColor: balloon.color }}
                      className="h-2 w-2 rotate-45 -mt-1 rounded-xs"
                    />
                    <div className="h-8 w-px bg-white/20 origin-top" />
                  </motion.button>
                ) : (
                  <motion.div
                    key={`revealed-${balloon.id}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                      scale: isSkyAscending ? 0.8 : 1,
                      y: isSkyAscending ? -40 : 0,
                      opacity: isSkyAscending ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-full rounded-2xl bg-[#171424] border border-rose-500/30 p-3 text-center shadow-lg flex flex-col items-center justify-center min-h-[130px]"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-rose-400">
                      {balloon.category}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {balloon.content}
                    </p>
                    <span className="mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                      <Check size={10} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Completion Dissolve Indicator */}
      <div className="min-h-14 pb-6 flex items-center justify-center z-10">
        <AnimatePresence>
          {allPopped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isSkyAscending ? 0 : 1,
                y: isSkyAscending ? -30 : 0,
              }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold"
            >
              <Sparkles size={14} />
              <span>CLUE COMPLETE · LOOK UP</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
