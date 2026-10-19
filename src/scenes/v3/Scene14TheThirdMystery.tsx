import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Archive, Heart, Compass, ArrowLeft } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene14TheThirdMystery: React.FC = () => {
  const { config, restartExperience, goToScene } = useStory();
  const [revealedSecret, setRevealedSecret] = useState(false);

  const mystery = config.thirdMystery;

  const handleToggleSecret = () => {
    sounds.playTap();
    setRevealedSecret((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-5 select-none bg-radial from-[#13122b] via-[#090714] to-black text-center overflow-y-auto">
      {/* Background ambient decorative glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />

      <div className="pt-6" />

      {/* Main Treasure Hunt Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10"
      >
        {/* Top Mystery Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-rose-500/15 border border-cyan-400/30 px-3.5 py-1.5 text-[11px] text-cyan-200 font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
        >
          <Compass size={12} className="text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{mystery.badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-rose-200 drop-shadow-[0_0_25px_rgba(56,189,248,0.45)] mb-2"
        >
          {mystery.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-xs text-neutral-400 italic mb-6"
        >
          {mystery.subtitle}
        </motion.p>

        {/* Parchment Riddle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative w-full rounded-3xl bg-gradient-to-b from-[#1b1933]/90 via-[#100d20]/95 to-[#0b0817] border border-cyan-400/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(56,189,248,0.18)] backdrop-blur-xl flex flex-col items-center"
        >
          {/* Diamond Shimmer Icon */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-white/10 to-rose-500/20 border border-cyan-300/40 shadow-inner flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl filter drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]">💎</span>
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-cyan-300 rounded-full animate-ping" />
          </div>

          {/* Stanzas of the Clue */}
          <div className="space-y-4 text-center max-w-xs mx-auto">
            {/* Stanza 1 */}
            <p className="font-serif text-base sm:text-lg leading-relaxed text-neutral-100 font-medium tracking-wide">
              {mystery.stanzas[0]}
              <br />
              <span className="text-cyan-200">{mystery.stanzas[1]}</span>
            </p>

            {/* Subtle Divider */}
            <div className="flex items-center justify-center gap-2 py-0.5 opacity-60">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
              <Sparkles size={11} className="text-cyan-300" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>

            {/* Stanza 2 */}
            <p className="font-serif text-base sm:text-lg leading-relaxed text-neutral-100 font-medium tracking-wide">
              {mystery.stanzas[2]}
              <br />
              <span className="text-rose-200">{mystery.stanzas[3]}</span>
            </p>

            {/* Subtle Divider */}
            <div className="flex items-center justify-center gap-2 py-0.5 opacity-60">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400" />
              <Heart size={11} className="text-rose-400 fill-rose-400" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-rose-400" />
            </div>

            {/* Stanza 3 */}
            <p className="font-serif text-base sm:text-lg leading-relaxed text-neutral-100 font-medium tracking-wide">
              {mystery.stanzas[4]}
              <br />
              <span className="font-semibold text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                {mystery.stanzas[5]}
              </span>
            </p>
          </div>

          {/* Interactive Whisper Card */}
          <div className="mt-6 w-full pt-4 border-t border-white/10">
            <button
              onClick={handleToggleSecret}
              className="w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-cyan-400/20 p-3 text-xs text-cyan-200/90 font-medium transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} className="text-cyan-300" />
              <span>{revealedSecret ? 'Hide secret hint' : 'Tap for a secret hint ✦'}</span>
            </button>

            {revealedSecret && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[12px] text-cyan-100 italic"
              >
                {mystery.instruction}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation & Controls */}
      <div className="min-h-24 pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center justify-center gap-2 mt-6">
        <button
          onClick={() => {
            sounds.playTap();
            goToScene(13); // Back to the Birthday Surprise Photo
          }}
          className="w-full rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:bg-rose-500/30 border border-rose-500/40 py-3 text-xs font-semibold uppercase tracking-wider text-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>VIEW BIRTHDAY PHOTO AGAIN ❤️</span>
        </button>

        <div className="flex gap-2 w-full">
          <button
            onClick={() => {
              sounds.playTap();
              restartExperience();
            }}
            className="flex-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>PLAY AGAIN</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              goToScene(6);
            }}
            className="flex-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Archive size={13} />
            <span>VAULT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
