import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';
import { MicroHint } from '../../components/MicroHint';

export const Scene13TheLastGift: React.FC = () => {
  const { config, nextScene, openGift } = useStory();
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpenBox = () => {
    if (isOpening || isRevealed) return;
    setIsOpening(true);
    openGift();

    // Box shakes, lid lifts, light emerges, then reveals the silver necklace
    setTimeout(() => {
      setIsRevealed(true);
      sounds.startAmbientMusic('reveal');
    }, 1100);
  };

  const handleProceedToFinalReveal = () => {
    sounds.playTap();
    nextScene(); // Chapter 14: Final Reveal
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-5 select-none bg-black text-center overflow-y-auto">
      <div className="pt-6" />

      {/* Stage 1: The Cinematic Gift Box */}
      {!isRevealed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="my-auto flex flex-col items-center max-w-xs mx-auto w-full z-10"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-3">
            <Sparkles size={11} />
            <span>CHAPTER 13 • THE GIFT</span>
          </div>

          <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white mb-2">
            {config.gift.heading}
          </h2>
          <p className="text-xs text-neutral-400 italic mb-8">
            {config.gift.boxPrompt}
          </p>

          <div
            onClick={!isOpening ? handleOpenBox : undefined}
            className="cursor-pointer flex flex-col items-center group active:scale-95 transition-transform"
          >
            {/* Ribbon Bow */}
            <motion.div
              animate={{
                y: isOpening ? -70 : 0,
                opacity: isOpening ? 0 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="relative z-20 -mb-4 flex items-center justify-center"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md border border-amber-300" />
              <div className="absolute h-6 w-16 -rotate-15 rounded-full bg-amber-400/80 -z-10 shadow-sm" />
              <div className="absolute h-6 w-16 rotate-15 rounded-full bg-amber-400/80 -z-10 shadow-sm" />
            </motion.div>

            {/* Lid */}
            <motion.div
              animate={
                isOpening
                  ? { y: -50, rotate: -12, opacity: 0.3 }
                  : { x: [0, -3, 3, 0], scale: [1, 1.02, 1] }
              }
              transition={
                isOpening
                  ? { duration: 0.6 }
                  : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
              }
              className="relative z-10 h-11 w-44 rounded-t-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 shadow-xl flex items-center justify-center border-t border-rose-400/30"
            >
              <div className="h-full w-7 bg-amber-400/90 shadow-sm" />
            </motion.div>

            {/* Body */}
            <motion.div
              animate={
                isOpening
                  ? { scale: [1, 1.04, 1], filter: 'drop-shadow(0 0 35px rgba(251,191,36,0.8))' }
                  : {}
              }
              className="relative h-36 w-40 rounded-b-2xl bg-gradient-to-b from-rose-800 to-rose-950 shadow-2xl flex items-center justify-center overflow-hidden border-b border-rose-900"
            >
              <div className="h-full w-7 bg-amber-400/90 shadow-inner" />
            </motion.div>
          </div>

          <div className="mt-10 w-full max-w-xs flex flex-col items-center gap-2">
            <button
              onClick={handleOpenBox}
              disabled={isOpening}
              className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift size={16} />
              <span>{isOpening ? 'OPENING...' : config.gift.buttonText}</span>
            </button>
            <MicroHint text="Tap the box or button to unwrap" />
          </div>
        </motion.div>
      ) : (
        /* Stage 2: The Physical Necklace Showcase & Direct Finale Bridge */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2">
            <Sparkles size={11} />
            <span>FOR YOU TO KEEP CLOSE</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-1">
            {config.gift.necklaceTitle}
          </h3>

          <p className="text-xs text-neutral-400 italic mb-5">
            {config.gift.necklaceSubtitle}
          </p>

          {/* Luxury Necklace Showcase Card */}
          <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#1c162b] to-[#0c0915] border border-rose-500/30 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.95),0_0_40px_rgba(244,63,94,0.18)] flex flex-col items-center">
            {/* Visual Silver Chain & Glowing Pendant */}
            <div className="relative h-48 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-radial from-slate-900/70 to-black">
              {/* Delicate Silver Chain Arc */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 160">
                <path
                  d="M 30,10 Q 100,120 170,10"
                  fill="none"
                  stroke="url(#silverGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  filter="drop-shadow(0 0 5px rgba(255,255,255,0.7))"
                />
                <defs>
                  <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Sparkling Silver Pendant */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.04, 1],
                  filter: [
                    'drop-shadow(0 0 16px rgba(255,255,255,0.6))',
                    'drop-shadow(0 0 28px rgba(244,63,94,0.85))',
                    'drop-shadow(0 0 16px rgba(255,255,255,0.6))',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative z-10 mt-14 flex items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-slate-300 via-white to-slate-200 border-2 border-white/90 shadow-2xl flex items-center justify-center">
                  <Heart size={26} className="text-rose-500 fill-rose-500" />
                </div>
                {/* Sparkle glimmers */}
                <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-white rounded-full animate-ping" />
              </motion.div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-200 italic leading-relaxed px-2">
              {config.gift.necklaceDescription}
            </p>

            <p className="mt-2 text-[11px] text-rose-300/90 font-medium">
              {config.gift.necklaceDetail}
            </p>
          </div>

          <div className="mt-6 w-full max-w-xs space-y-2">
            <button
              onClick={handleProceedToFinalReveal}
              className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{config.gift.continueButtonText}</span>
              <ArrowRight size={16} />
            </button>
            <MicroHint text="Tap to view our final birthday reveal" />
          </div>
        </motion.div>
      )}

      <div className="pb-6" />
    </div>
  );
};
