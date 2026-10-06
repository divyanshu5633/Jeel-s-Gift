import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene21TheStoryReveal: React.FC = () => {
  const { config, nextScene } = useStory();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2800);
    const t3 = setTimeout(() => setStep(3), 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#1e1026] via-[#0d0714] to-black overflow-hidden">
      {/* Golden dawn horizon gradient rising */}
      <motion.div
        animate={{
          opacity: step >= 3 ? 0.45 : 0.1,
          scale: step >= 3 ? 1.2 : 1,
        }}
        transition={{ duration: 2 }}
        className="pointer-events-none fixed -bottom-20 -left-20 -right-20 h-96 rounded-full bg-gradient-to-t from-amber-500/40 via-rose-500/30 to-transparent blur-3xl"
      />

      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold">
          THE HORIZON
        </span>
      </div>

      {/* Parallax Multi-Depth Photo Constellation */}
      <div className="relative my-auto h-[380px] w-full max-w-sm mx-auto z-10 flex flex-col items-center justify-center">
        {/* Photo 1: Deep Background Left */}
        {step >= 1 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, x: -60, y: -40 }}
            animate={{ scale: 1, opacity: 0.85, x: -45, y: -50, rotate: -6 }}
            transition={{ duration: 0.9 }}
            className="absolute z-10 w-44 rounded-2xl bg-white/10 p-2 border border-white/20 shadow-2xl backdrop-blur-md"
          >
            <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-black">
              <img
                src={config.storyReveal.photos[0].url}
                alt="Past 1"
                className="h-full w-full object-cover filter brightness-95"
              />
            </div>
            <p className="mt-1 text-[10px] text-center text-rose-200 font-semibold tracking-wider">
              {config.storyReveal.photos[0].caption}
            </p>
          </motion.div>
        )}

        {/* Photo 2: Midground Right */}
        {step >= 2 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, x: 60, y: 30 }}
            animate={{ scale: 1, opacity: 0.9, x: 45, y: 30, rotate: 5 }}
            transition={{ duration: 0.9 }}
            className="absolute z-20 w-48 rounded-2xl bg-white/15 p-2 border border-white/25 shadow-2xl backdrop-blur-md"
          >
            <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-black">
              <img
                src={config.storyReveal.photos[1].url}
                alt="Past 2"
                className="h-full w-full object-cover filter brightness-95"
              />
            </div>
            <p className="mt-1 text-[10px] text-center text-rose-200 font-semibold tracking-wider">
              {config.storyReveal.photos[1].caption}
            </p>
          </motion.div>
        )}

        {/* Central Narrative Texts */}
        <div className="relative z-30 p-4 text-center max-w-xs bg-black/60 rounded-3xl backdrop-blur-lg border border-white/10 shadow-2xl">
          {step >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-neutral-300 italic"
            >
              {config.storyReveal.lines[0]}
            </motion.p>
          )}

          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-neutral-200 font-medium"
            >
              {config.storyReveal.lines[1]}
            </motion.p>
          )}

          {step >= 3 && (
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 font-cinzel text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-white drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            >
              {config.storyReveal.lines[2]}
            </motion.h3>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        {step >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={nextScene}
            className="w-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(251,191,36,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>ENTER THE NEXT CHAPTER</span>
            <ArrowRight size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
