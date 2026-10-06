import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene14TheLetter: React.FC = () => {
  const { config, nextScene } = useStory();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sounds.playTap();
    setIsOpen(true);
    setTimeout(() => {
      nextScene();
    }, 900);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#1e131d] via-[#0f0b12] to-black overflow-hidden">
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>A KEEPSAKE</span>
        </motion.div>

        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white">
          A LETTER
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-300 italic max-w-xs mx-auto">
          {config.letter.envelopePrompt}
        </p>
      </div>

      {/* 3D Envelope Component */}
      <div className="my-auto flex flex-col items-center justify-center max-w-xs mx-auto w-full z-10 py-6">
        <div className="relative h-56 w-72 rounded-2xl bg-[#e5d5be] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(244,63,94,0.15)] flex flex-col items-center justify-end overflow-hidden border border-[#d6be9d]">
          {/* Top Flap */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              transformOrigin: 'top center',
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-28 bg-[#d9c4a8] border-b border-[#c8b294] z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* Letter sliding out */}
          <motion.div
            initial={false}
            animate={{
              y: isOpen ? -80 : 0,
              opacity: isOpen ? 1 : 0.6,
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-8 w-56 h-36 bg-[#fbf7ee] rounded-xl shadow-md border border-neutral-200 z-10 p-3 flex flex-col justify-center items-center text-center"
          >
            <Heart size={20} className="text-rose-500 fill-rose-500 mb-1" />
            <p className="font-handwriting text-lg text-neutral-800">
              For {config.recipient}
            </p>
            <div className="h-0.5 w-12 bg-rose-300 mt-1" />
          </motion.div>

          {/* Envelope Front Pocket */}
          <div
            className="absolute inset-0 bg-[#e5d5be] z-15 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 45%, 100% 100%, 0 100%)',
            }}
          />

          {/* Wax Seal */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-20 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 text-white shadow-lg border border-rose-400/50"
            >
              <Heart size={16} className="fill-white" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleOpen}
          disabled={isOpen}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Mail size={16} />
          <span>OPEN THE LETTER</span>
        </button>
      </div>
    </div>
  );
};
