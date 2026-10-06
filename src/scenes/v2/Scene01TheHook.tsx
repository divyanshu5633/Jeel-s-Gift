import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Heart } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene01TheHook: React.FC = () => {
  const { config, nextScene } = useStory();
  const [isZooming, setIsZooming] = useState(false);

  const handleStart = () => {
    sounds.playHeartbeat();
    setIsZooming(true);
    setTimeout(() => {
      nextScene();
    }, 600);
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-8 text-center select-none bg-radial from-[#150a18] via-[#08040b] to-black overflow-hidden">
      {/* Cinematic zoom transition */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 22, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed z-50 h-32 w-32 rounded-full bg-rose-500/30 blur-2xl"
          />
        )}
      </AnimatePresence>

      <div className="pt-8" />

      {/* Hero Typography */}
      <motion.div
        animate={{
          scale: isZooming ? 0.9 : 1,
          opacity: isZooming ? 0 : 1,
          filter: isZooming ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.5 }}
        className="my-auto flex flex-col items-center max-w-xs"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-3"
        >
          PRIVATE TRANSMISSION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 drop-shadow-[0_0_30px_rgba(244,63,94,0.3)] leading-tight"
        >
          {config.hook.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-base font-light text-neutral-300 italic"
        >
          {config.hook.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex items-center gap-2 text-xs text-rose-300/80"
        >
          <Headphones size={14} className="animate-pulse" />
          <span>{config.hook.headphonesHint}</span>
        </motion.div>
      </motion.div>

      {/* Heartbeat Pulse Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-xs pb-6"
      >
        <button
          onClick={handleStart}
          disabled={isZooming}
          className="group relative w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            {config.hook.buttonText}
          </motion.span>
          <Heart size={16} className="fill-white animate-pulse" />
        </button>
      </motion.div>
    </div>
  );
};
