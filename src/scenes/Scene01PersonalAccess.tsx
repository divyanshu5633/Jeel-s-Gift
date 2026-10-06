import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene01PersonalAccess: React.FC = () => {
  const { config, nextScene } = useStory();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      nextScene();
    }, 700);
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-8 text-center select-none overflow-hidden bg-radial from-[#120a16] via-[#07050a] to-[#020204]">
      {/* Expanding glow on press */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 18, opacity: 0.9 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed z-50 h-32 w-32 rounded-full bg-rose-500/30 blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* Top subtle lock tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-6 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium"
      >
        <Lock size={12} className="text-rose-400/80" />
        <span>{config.tagline}</span>
      </motion.div>

      {/* Central hero */}
      <motion.div
        animate={{
          scale: isEntering ? 0.92 : 1,
          filter: isEntering ? 'blur(8px)' : 'blur(0px)',
          opacity: isEntering ? 0 : 1,
        }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center my-auto max-w-sm"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3"
        >
          AN INVITATION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-cinzel text-4xl sm:text-5xl font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 drop-shadow-[0_0_35px_rgba(244,63,94,0.3)]"
        >
          FOR {config.recipient.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm font-light text-neutral-300 italic tracking-wide max-w-xs"
        >
          {config.subTagline}
        </motion.p>
      </motion.div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-xs pb-6"
      >
        <button
          onClick={handleEnter}
          disabled={isEntering}
          className="group relative w-full overflow-hidden rounded-full p-[1px] font-medium transition-all active:scale-95 disabled:pointer-events-none"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-[2px]" />
          <span className="relative flex items-center justify-center gap-3 rounded-full bg-[#110d18] px-8 py-4 text-sm tracking-[0.2em] uppercase text-rose-100 group-hover:bg-[#160f22] transition-colors border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
            <span>ENTER</span>
            <ArrowRight size={16} className="text-rose-400 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </motion.div>
    </div>
  );
};
