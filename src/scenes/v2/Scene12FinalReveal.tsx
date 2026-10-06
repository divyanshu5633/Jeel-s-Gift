import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const Scene12FinalReveal: React.FC = () => {
  const { config, restartExperience } = useStory();
  const [step, setStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => setStep(3), 3900);
    const t4 = setTimeout(() => setStep(4), 5600);
    const t5 = setTimeout(() => setStep(5), 7500);
    const t6 = setTimeout(() => {
      setStep(6); // photo appears
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#fef08a', '#c084fc'],
      });
    }, 9500);

    // Let the final message breathe for a moment before showing replay buttons
    const t7 = setTimeout(() => setShowButtons(true), 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-6 select-none bg-black text-center overflow-y-auto">
      <div className="pt-6" />

      {/* Narrative Sequence */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full space-y-6">
        {step >= 1 && step < 6 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base font-light text-neutral-400"
          >
            {config.finalReveal.lines[0]}
          </motion.p>
        )}

        {step >= 2 && step < 6 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base font-light text-neutral-400"
          >
            {config.finalReveal.lines[1]}
          </motion.p>
        )}

        {step >= 3 && step < 6 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base font-light text-neutral-400"
          >
            {config.finalReveal.lines[2]}
          </motion.p>
        )}

        {step >= 4 && step < 6 && (
          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="font-cinzel text-2xl font-bold text-white pt-2"
          >
            {config.finalReveal.mainHeading}
          </motion.h3>
        )}

        {step >= 5 && step < 6 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-cinzel text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.7)]"
          >
            {config.finalReveal.youHeading}
          </motion.h1>
        )}

        {/* Step 6: Keepsake Photo & Ending Wish */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[310px] rounded-3xl bg-white p-3.5 pb-6 text-neutral-900 shadow-2xl border border-neutral-100"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900">
              <img
                src={config.finalReveal.photo}
                alt="Finale"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-rose-500">
                <Heart size={14} className="fill-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-xl font-bold text-neutral-900">
                {config.finalReveal.birthdayWish}
              </h3>
              <p className="mt-2 font-handwriting text-2xl font-bold text-rose-600">
                {config.finalReveal.signature}
              </p>
              {config.finalReveal.whisperAudioNote && (
                <p className="mt-1 text-xs text-neutral-500 italic">
                  {config.finalReveal.whisperAudioNote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Replay Actions (fades in quietly after pause) */}
      <div className="min-h-20 pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center justify-center gap-2.5">
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full flex flex-col gap-2"
            >
              <button
                onClick={restartExperience}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <RotateCcw size={15} />
                <span>PLAY AGAIN</span>
              </button>

              <button
                onClick={restartExperience}
                className="w-full rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-300 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>START OUR STORY AGAIN</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
