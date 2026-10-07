import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene04BalloonRoom: React.FC = () => {
  const { config, nextScene, poppedBalloons, popBalloon } = useStory();
  const [isRisingToSky, setIsRisingToSky] = useState(false);

  const allPopped = poppedBalloons.length === config.balloons.length;

  const handlePop = (balloonId: string, event: React.PointerEvent | React.MouseEvent) => {
    if (poppedBalloons.includes(balloonId)) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 55,
      origin: { x, y },
      colors: ['#fda4af', '#f43f5e', '#e0e7ff', '#fef08a', '#c084fc'],
      ticks: 160,
      gravity: 0.85,
    });

    popBalloon(balloonId);
  };

  const handleFollowClue = () => {
    sounds.playStarChime();
    setIsRisingToSky(true);
    // Pieces ascend upward and room darkens into night sky
    setTimeout(() => {
      nextScene();
    }, 1000);
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col justify-between p-5 select-none overflow-hidden transition-all duration-1000 ${
        isRisingToSky
          ? 'bg-radial from-[#04030d] via-[#020208] to-black'
          : 'bg-gradient-to-b from-[#180e22] via-[#0f0a17] to-[#06040a]'
      }`}
    >
      {/* Room ambient lighting glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>CHAPTER 04 • THE BALLOON ROOM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200"
        >
          FOUR THINGS ARE HIDING HERE.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.2 }}
          className="mt-1.5 text-xs sm:text-sm text-neutral-400 italic"
        >
          Tap any balloon to pop it ({poppedBalloons.length} / {config.balloons.length} discovered)
        </motion.p>
      </div>

      {/* 3D Balloon Room Field */}
      <div className="relative my-auto grid grid-cols-2 gap-4 max-w-sm mx-auto w-full py-4 z-10">
        {config.balloons.map((balloon, index) => {
          const isPopped = poppedBalloons.includes(balloon.id);
          const depth = balloon.depth || 0.8;

          return (
            <div
              key={balloon.id}
              className="relative flex flex-col items-center justify-center min-h-[175px]"
            >
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  /* Floating Physical Balloon */
                  <motion.div
                    key={`balloon-${balloon.id}`}
                    initial={{ scale: 0, y: 35 }}
                    animate={{
                      scale: depth,
                      y: [0, -12, 6, 0],
                      rotate: [0, 2.5, -2, 0],
                    }}
                    exit={{ scale: 1.45, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.5, delay: index * 0.1 },
                      y: { repeat: Infinity, duration: 3.6 + index * 0.4, ease: 'easeInOut' },
                      rotate: { repeat: Infinity, duration: 4.2 + index * 0.3, ease: 'easeInOut' },
                    }}
                    drag
                    dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
                    dragElastic={0.3}
                    whileTap={{ scale: depth * 1.12, scaleY: depth * 0.88 }}
                    onClick={(e) => handlePop(balloon.id, e)}
                    className="group relative flex flex-col items-center focus:outline-hidden cursor-pointer touch-none"
                  >
                    {/* Balloon Body with 3D Radial Highlight */}
                    <div
                      style={{
                        background: `radial-gradient(circle at 35% 28%, ${balloon.highlight}, ${balloon.color})`,
                        boxShadow: `0 14px 32px ${balloon.color}55`,
                      }}
                      className="relative h-28 w-24 rounded-full transition-transform group-hover:scale-105 active:scale-95"
                    >
                      {/* Realistic light sheen reflection */}
                      <span className="absolute top-4 left-4 h-6 w-3 rounded-full bg-white/45 rotate-[-30deg]" />
                      <span className="absolute top-11 left-3 h-2 w-1.5 rounded-full bg-white/25 rotate-[-30deg]" />
                    </div>

                    {/* Knot and String */}
                    <div
                      style={{ backgroundColor: balloon.color }}
                      className="h-2.5 w-2.5 rotate-45 -mt-1 rounded-xs shadow-xs"
                    />
                    <div className="h-10 w-px bg-white/25 origin-top animate-pulse" />
                  </motion.div>
                ) : (
                  /* Revealed Physical Parchment Card */
                  <motion.div
                    key={`revealed-${balloon.id}`}
                    initial={{ scale: 0.6, opacity: 0, y: 15 }}
                    animate={{
                      scale: isRisingToSky ? 0.3 : 1,
                      opacity: isRisingToSky ? 0 : 1,
                      y: isRisingToSky ? -280 : 0,
                    }}
                    transition={{ duration: 0.6, delay: isRisingToSky ? index * 0.08 : 0 }}
                    className="w-full rounded-2xl bg-[#171424]/95 border border-rose-500/30 p-3.5 text-center shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between min-h-[145px]"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-rose-400">
                      {balloon.category}
                    </span>
                    <p className="mt-1 text-sm sm:text-base font-bold text-white tracking-wide">
                      {balloon.content}
                    </p>
                    {balloon.subtext && (
                      <p className="mt-1 text-[11px] text-neutral-400 italic leading-snug">
                        {balloon.subtext}
                      </p>
                    )}
                    <span className="mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Persistent & Clear Progression Button - NEVER GET STUCK */}
      <div className="pb-6 max-w-sm mx-auto w-full z-10 flex flex-col items-center gap-2">
        <button
          onClick={handleFollowClue}
          className={`group w-full rounded-full p-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
            allPopped
              ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 animate-pulse'
              : 'bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/15 active:scale-95'
          }`}
        >
          <span>
            {allPopped
              ? 'FOLLOW CLUES INTO THE SKY'
              : `CONTINUE TO OUR UNIVERSE (${poppedBalloons.length}/4 POPPED)`}
          </span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>

        {!allPopped && (
          <p className="text-[11px] text-neutral-400 italic">
            Tap balloons to pop them or tap the button above to continue
          </p>
        )}
      </div>
    </div>
  );
};
