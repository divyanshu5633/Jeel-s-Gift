import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Heart, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';
import { MicroHint } from '../../components/MicroHint';

export const Scene05OurUniverse: React.FC = () => {
  const { config, nextScene, visitedStars, visitStar } = useStory();
  const [activeStarIdx, setActiveStarIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStarClick = (idx: number) => {
    visitStar(config.stars[idx].id);
    setActiveStarIdx(idx);
  };

  const handleNextMemory = () => {
    if (activeStarIdx !== null) {
      const nextIdx = (activeStarIdx + 1) % config.stars.length;
      visitStar(config.stars[nextIdx].id);
      setActiveStarIdx(nextIdx);
    }
  };

  const handlePrevMemory = () => {
    if (activeStarIdx !== null) {
      const prevIdx = (activeStarIdx - 1 + config.stars.length) % config.stars.length;
      visitStar(config.stars[prevIdx].id);
      setActiveStarIdx(prevIdx);
    }
  };

  const handleProceedToVault = () => {
    sounds.playUnlock();
    setIsTransitioning(true);
    setTimeout(() => {
      nextScene();
    }, 700);
  };

  const activeStar = activeStarIdx !== null ? config.stars[activeStarIdx] : null;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#0c0818] via-[#04030a] to-black overflow-hidden">
      {/* Background Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animationDelay: `${(i % 5) * 0.7}s`,
            }}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-ping"
          />
        ))}
      </div>

      {/* FULL-SCREEN IMMERSIVE MEMORY PORTAL */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{
              scale: isTransitioning ? 0.8 : 1,
              opacity: isTransitioning ? 0 : 1,
            }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 pt-2 max-w-sm mx-auto w-full">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300">
                {activeStar.date}
              </span>
              <button
                onClick={() => setActiveStarIdx(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer active:scale-95"
                aria-label="Close Memory"
              >
                <X size={18} />
              </button>
            </div>

            {/* Central Memory Window */}
            <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-neutral-900"
              >
                <img
                  src={activeStar.image}
                  alt={activeStar.label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-rose-400 backdrop-blur-sm">
                  <Heart size={16} className="fill-rose-400 animate-pulse" />
                </div>
              </motion.div>

              {/* Memory Caption */}
              <div className="mt-4 text-center px-2">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {activeStar.label}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                  "{activeStar.caption}"
                </p>
              </div>
            </div>

            {/* Carousel & Progression Controls */}
            <div className="pb-4 max-w-sm mx-auto w-full flex items-center justify-between gap-3 z-10">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMemory}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 cursor-pointer"
                  aria-label="Previous Memory"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextMemory}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 cursor-pointer"
                  aria-label="Next Memory"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <button
                onClick={handleProceedToVault}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 cursor-pointer"
              >
                <span>OPEN STORY VAULT</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] text-indigo-300 font-semibold mb-2">
          <Sparkles size={12} />
          <span>CHAPTER 05 • CELESTIAL MEMORIES</span>
        </div>

        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-300">
          OUR UNIVERSE
        </h2>
        <p className="mt-1.5 text-xs text-neutral-400 italic">
          Every star holds a memory. Tap any star to enter it.
        </p>
      </div>

      {/* Constellation Star Map */}
      <div className="relative my-auto h-[360px] w-full max-w-sm mx-auto z-10">
        {/* Constellation Connector Lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-25">
          <polyline
            points="80,100 120,180 270,80 280,220 220,290 70,270"
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {config.stars.map((star, idx) => (
          <div
            key={star.id}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group touch-manipulation"
            onClick={() => handleStarClick(idx)}
          >
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2 + (idx % 3) * 0.4,
              }}
              className="flex items-center justify-center p-3"
            >
              <div
                style={{
                  backgroundColor: star.color,
                  boxShadow: `0 0 18px 5px ${star.color}`,
                }}
                className="h-3.5 w-3.5 rounded-full transition-transform group-hover:scale-150"
              />
            </motion.div>

            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] text-neutral-400 group-hover:text-white font-medium bg-black/60 px-2 py-0.5 rounded-md border border-white/5 backdrop-blur-xs">
              {star.label}
            </span>
          </div>
        ))}
      </div>

      {/* Proceed Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center gap-2">
        <button
          onClick={handleProceedToVault}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-4 text-xs uppercase tracking-widest text-neutral-200 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>{visitedStars.length >= 2 ? 'ENTER STORY VAULT' : 'EXPLORE OR CONTINUE'}</span>
          <ArrowRight size={14} />
        </button>

        <MicroHint text="Tap any twinkling star to reveal its story" />
      </div>
    </div>
  );
};
