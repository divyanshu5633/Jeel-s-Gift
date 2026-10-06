import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircleHeart, Flame, Smile, UtensilsCrossed } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene11Statistics: React.FC = () => {
  const { config, nextScene } = useStory();
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
  });
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Number count-up animation
    const duration = 1800;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        s1: Math.floor(1284 * ease),
        s2: Math.floor(327 * ease),
        s3: Math.floor(583 * ease),
        s4: Math.floor(91 * ease),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleAccurate = () => {
    sounds.playCelebration();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#f97316', '#eab308', '#a855f7', '#f43f5e'],
    });

    setIsExploding(true);
    setTimeout(() => {
      nextScene();
    }, 1200);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 's1':
        return <MessageCircleHeart size={18} className="text-sky-400" />;
      case 's2':
        return <Flame size={18} className="text-orange-400" />;
      case 's3':
        return <Smile size={18} className="text-amber-400" />;
      case 's4':
        return <UtensilsCrossed size={18} className="text-purple-400" />;
      default:
        return <Heart size={18} className="text-rose-400" />;
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#151224] via-[#0d0a17] to-[#06040c] overflow-hidden">
      {/* Collapsing into glowing heart on finish */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-rose-500/50 blur-2xl animate-pulse" />
              <Heart size={64} className="text-rose-500 fill-rose-500 absolute drop-shadow-[0_0_25px_rgba(244,63,94,0.9)] animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>VERIFIED DATA</span>
        </motion.div>

        <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-white leading-snug">
          OUR COMPLETELY SCIENTIFIC STATISTICS
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="my-auto grid grid-cols-1 gap-2.5 max-w-sm mx-auto w-full py-4 z-10">
        {config.statistics.map((stat, idx) => {
          const displayValue =
            stat.id === 's5' ? '∞' : (counts[stat.id] || stat.value).toLocaleString();

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between rounded-2xl bg-[#1a1728]/80 border border-white/8 px-4 py-3.5 backdrop-blur-md shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                  {getIcon(stat.id)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral-300 max-w-[190px]">
                  {stat.label}
                </span>
              </div>

              <div
                style={{ color: stat.color }}
                className={`text-right font-cinzel font-bold tracking-tight ${
                  stat.id === 's5' ? 'text-3xl' : 'text-xl sm:text-2xl'
                }`}
              >
                {displayValue}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Trigger Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleAccurate}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>THAT SOUNDS ACCURATE 😂</span>
        </button>
      </div>
    </div>
  );
};
