import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, Calendar, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene09MemoryCard: React.FC = () => {
  const { config, nextScene, activeStarId } = useStory();

  // Find initial star index
  const initialIndex = Math.max(
    0,
    config.stars.findIndex((s) => s.id === activeStarId)
  );
  const [index, setIndex] = useState(initialIndex);

  const star = config.stars[index] || config.stars[0];

  const handleNext = () => {
    sounds.playTap();
    if (index < config.stars.length - 1) {
      setIndex(index + 1);
    } else {
      nextScene();
    }
  };

  const handlePrev = () => {
    sounds.playTap();
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#100d1c] via-[#080610] to-black overflow-hidden">
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold">
          MEMORY {index + 1} OF {config.stars.length}
        </p>
      </div>

      {/* Polaroid Card */}
      <div className="my-auto flex flex-col items-center justify-center max-w-sm mx-auto w-full py-2 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-[320px] rounded-2xl bg-white p-3.5 pb-6 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.1)] border border-neutral-100"
          >
            {/* Photo frame */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-900">
              <img
                src={star.image}
                alt={star.label}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white">
                <Heart size={14} className="fill-rose-500 text-rose-500" />
              </span>
            </div>

            {/* Captions */}
            <div className="mt-4 px-1 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <Calendar size={12} className="text-rose-500" />
                <span>{star.date}</span>
              </div>

              <h3 className="mt-1.5 font-cinzel text-base font-bold tracking-wide text-neutral-900">
                {star.label}
              </h3>

              <p className="mt-2 text-xs font-light leading-relaxed text-neutral-700 italic">
                "{star.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="pb-6 max-w-sm mx-auto w-full flex items-center justify-between gap-3 z-10">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none text-white transition-all backdrop-blur-md active:scale-95"
          aria-label="Previous Memory"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-6 py-3.5 text-xs font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95 transition-all"
        >
          <span>{index < config.stars.length - 1 ? 'NEXT MEMORY' : 'POLAROID STACK'}</span>
          {index < config.stars.length - 1 ? <ChevronRight size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
};
