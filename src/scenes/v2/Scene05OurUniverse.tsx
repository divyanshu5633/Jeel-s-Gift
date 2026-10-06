import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene05OurUniverse: React.FC = () => {
  const { config, nextScene, visitedStars, visitStar } = useStory();
  const [activeStarIdx, setActiveStarIdx] = useState<number | null>(null);
  const [isTransitioningToPolaroid, setIsTransitioningToPolaroid] = useState(false);

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

  const handleProceedToPolaroid = () => {
    sounds.playCameraSnap();
    setIsTransitioningToPolaroid(true);
    // Photograph shrinks and lands onto Polaroid
    setTimeout(() => {
      nextScene();
    }, 700);
  };

  const activeStar = activeStarIdx !== null ? config.stars[activeStarIdx] : null;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#0c0818] via-[#04030a] to-black overflow-hidden">
      {/* Background Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
            }}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-ping"
          />
        ))}
      </div>

      {/* FULL-SCREEN ZOOM MEMORY VIEW */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: isTransitioningToPolaroid ? 0.8 : 1,
              opacity: isTransitioningToPolaroid ? 0 : 1,
            }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300">
                {activeStar.date}
              </span>
              <button
                onClick={() => setActiveStarIdx(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="Close Memory"
              >
                <X size={16} />
              </button>
            </div>

            {/* Central Large Photo */}
            <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-neutral-900">
                <img
                  src={activeStar.image}
                  alt={activeStar.label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-rose-400 backdrop-blur-sm">
                  <Heart size={14} className="fill-rose-400" />
                </div>
              </div>

              {/* Memory Caption */}
              <div className="mt-4 text-center px-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                  {activeStar.label}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                  "{activeStar.caption}"
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="pb-4 max-w-sm mx-auto w-full flex items-center justify-between gap-3 z-10">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMemory}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNextMemory}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button
                onClick={handleProceedToPolaroid}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95"
              >
                <span>FLASHBACKS</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-300">
          OUR UNIVERSE
        </h2>
        <p className="mt-1.5 text-xs text-neutral-400 italic">
          Every star holds a memory. Tap a star to zoom in.
        </p>
      </div>

      {/* Constellation Star Map (6 Stars Only) */}
      <div className="relative my-auto h-[350px] w-full max-w-sm mx-auto z-10">
        <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
          <polyline
            points="80,100 120,180 270,80 280,220 220,290 70,270"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
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
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => handleStarClick(idx)}
          >
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + (idx % 3) * 0.5,
              }}
              className="flex items-center justify-center p-3"
            >
              <div
                style={{
                  backgroundColor: star.color,
                  boxShadow: `0 0 16px 4px ${star.color}`,
                }}
                className="h-3.5 w-3.5 rounded-full transition-transform group-hover:scale-150"
              />
            </motion.div>

            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] text-neutral-400 group-hover:text-white font-medium">
              {star.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom helper button to proceed */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleProceedToPolaroid}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3.5 text-xs uppercase tracking-widest text-neutral-300 transition-all active:scale-95"
        >
          <span>{visitedStars.length >= 2 ? 'CONTINUE TO FLASHBACKS' : 'VIEW MEMORIES'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
