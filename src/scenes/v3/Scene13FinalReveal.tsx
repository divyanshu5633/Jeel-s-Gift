import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Archive, ArrowRight, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene13FinalReveal: React.FC = () => {
  const { config, nextScene, restartExperience, goToScene } = useStory();
  const [step, setStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2300);
    const t3 = setTimeout(() => setStep(3), 3900);
    const t4 = setTimeout(() => setStep(4), 5600);
    const t5 = setTimeout(() => setStep(5), 7400);
    const t6 = setTimeout(() => {
      setStep(6); // photo appears
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#fef08a', '#c084fc', '#38bdf8'],
        ticks: 100,
      });
    }, 9200);

    // Reveal clue button and replay controls
    const t7 = setTimeout(() => setShowButtons(true), 10500);

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

  const handleFastForward = () => {
    if (step < 6) {
      setStep(6);
      setShowButtons(true);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#fef08a', '#c084fc', '#38bdf8'],
        ticks: 90,
      });
    }
  };

  const handleGoToThirdMystery = () => {
    sounds.playTap();
    nextScene(); // Chapter 14: The Third Mystery Clue
  };

  return (
    <div
      onClick={handleFastForward}
      className="relative flex min-h-dvh flex-col items-center justify-between p-5 select-none bg-black text-center overflow-y-auto"
    >
      <div className="pt-6" />

      {/* Cinematic Sequence */}
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
            className="font-cinzel text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 drop-shadow-[0_0_35px_rgba(244,63,94,0.7)]"
          >
            {config.finalReveal.youHeading}
          </motion.h1>
        )}

        {/* Step 6: Keepsake Framed Photo & Romantic Birthday Card */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[320px] rounded-3xl bg-white p-4 pb-6 text-neutral-900 shadow-2xl border border-neutral-100"
          >
            <div className="relative aspect-[4/5] max-h-[44vh] w-full overflow-hidden rounded-2xl bg-neutral-900">
              <img
                src={config.finalReveal.photo}
                alt="Finale"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: config.finalReveal.photoPosition || 'center 38%' }}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-rose-500">
                <Heart size={16} className="fill-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-xl font-bold text-neutral-900">
                {config.finalReveal.birthdayWish}
              </h3>
              <p className="mt-2 font-handwriting text-3xl font-bold text-rose-600">
                {config.finalReveal.signature}
              </p>
              {config.finalReveal.whisperAudioNote && (
                <p className="mt-1.5 text-xs text-neutral-500 italic">
                  {config.finalReveal.whisperAudioNote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Clue Bridge & Action Buttons (Fades in after the surprise is absorbed) */}
      <div className="min-h-28 pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center justify-center gap-2.5">
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col gap-2.5"
            >
              {/* THE THIRD MYSTERY PROCEED BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoToThirdMystery();
                }}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 p-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(244,63,94,0.55)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Sparkles size={16} className="text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span>THE THIRD MYSTERY 💎</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-2 w-full pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    restartExperience();
                  }}
                  className="flex-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>REPLAY</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToScene(6);
                  }}
                  className="flex-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Archive size={13} />
                  <span>VAULT</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
