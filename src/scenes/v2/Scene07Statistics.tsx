import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene07Statistics: React.FC = () => {
  const { config, nextScene } = useStory();
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    s1: 0,
    s2: 0,
    s3: 0,
  });
  const [isCollapsing, setIsCollapsing] = useState(false);

  useEffect(() => {
    // Rapid upward count-up animation (~900ms)
    const duration = 900;
    const steps = 25;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        s1: Math.floor(1284 * progress),
        s2: Math.floor(327 * progress),
        s3: Math.floor(91 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleCollapse = () => {
    sounds.playCelebration();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#f97316', '#a855f7', '#f43f5e'],
    });

    setIsCollapsing(true);
    // Numbers collapse into glowing heart and morph into audio waveform in next scene
    setTimeout(() => {
      nextScene();
    }, 1100);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#151022] via-[#090712] to-black overflow-hidden">
      {/* Collapsing Glowing Heart */}
      <AnimatePresence>
        {isCollapsing && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 12, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-rose-500/50 blur-xl animate-pulse" />
              <Heart size={56} className="text-rose-500 fill-rose-500 absolute drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2">
          <Sparkles size={11} />
          <span>VERIFIED RELATIONAL DATA</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-white">
          OUR COMPLETELY SCIENTIFIC DATA
        </h2>
      </div>

      {/* 4 Fast Data Counters */}
      <div className="my-auto grid grid-cols-1 gap-2.5 max-w-sm mx-auto w-full py-2 z-10">
        {config.statistics.map((stat, idx) => {
          const displayVal =
            stat.id === 's4' ? '∞' : (counts[stat.id] || stat.value).toLocaleString();

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center justify-between rounded-2xl bg-[#171426]/90 border border-white/8 px-4 py-3.5 backdrop-blur-md shadow-md"
            >
              <span className="text-xs sm:text-sm font-medium text-neutral-300 max-w-[200px]">
                {stat.label}
              </span>
              <span
                style={{ color: stat.color }}
                className={`font-cinzel font-bold tracking-tight ${
                  stat.id === 's4' ? 'text-3xl' : 'text-xl sm:text-2xl'
                }`}
              >
                {displayVal}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleCollapse}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>YEAH... THE DATA CHECKS OUT</span>
        </button>
      </div>
    </div>
  );
};
