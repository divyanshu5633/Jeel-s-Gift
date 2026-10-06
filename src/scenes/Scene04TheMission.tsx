import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene04TheMission: React.FC = () => {
  const { config, nextScene } = useStory();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-8 text-center select-none bg-radial from-[#150d1a] via-[#09060e] to-black overflow-hidden">
      {/* Background stardust glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-rose-500/25 blur-3xl"
      />

      <div className="pt-8" />

      {/* Main Mission Announcement */}
      <div className="my-auto flex flex-col items-center max-w-sm relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-500/30 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
        >
          <Compass size={32} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold mb-2"
        >
          OBJECTIVE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-cinzel text-4xl sm:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-400"
        >
          {config.question1.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 text-lg font-light text-neutral-200"
        >
          {config.question1.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-sm text-neutral-400 italic max-w-xs"
        >
          Somewhere in this experience are pieces of our story.
        </motion.p>
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="w-full max-w-xs pb-6 relative z-10"
      >
        <button
          onClick={nextScene}
          className="group relative w-full overflow-hidden rounded-full p-[1px] font-medium transition-all active:scale-95 shadow-[0_0_25px_rgba(244,63,94,0.3)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-full" />
          <span className="relative flex items-center justify-center gap-2 rounded-full bg-[#120a16] px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white group-hover:bg-transparent transition-colors">
            <span>START THE MISSION</span>
            <Sparkles size={16} className="text-rose-400" />
          </span>
        </button>
      </motion.div>
    </div>
  );
};
