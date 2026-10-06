import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, BookOpen, Heart, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene25FinalPhoto: React.FC = () => {
  const { config, restartExperience, goToScene } = useStory();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // 2-second emotional silence before revealing buttons
    const timer = setTimeout(() => {
      setShowButtons(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fcd34d', '#c084fc'],
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#191024] via-[#090712] to-black overflow-y-auto">
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>FINALE</span>
        </motion.div>
      </div>

      {/* Final Keepsake Polaroid Card */}
      <div className="my-auto flex flex-col items-center justify-center max-w-sm mx-auto w-full py-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[320px] rounded-3xl bg-white p-4 pb-7 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.2)] border border-neutral-100"
        >
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900">
            <img
              src={config.final.photo}
              alt="Final Keepsake"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
              <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" />
            </div>
          </div>

          <div className="mt-5 text-center px-1">
            <h3 className="font-cinzel text-xl font-bold tracking-wide text-neutral-900">
              {config.final.photoTitle}
            </h3>
            <p className="mt-2 text-xs font-light text-neutral-600 italic leading-relaxed">
              "{config.final.photoSubtext}"
            </p>
            <p className="mt-4 font-handwriting text-2xl font-bold text-rose-600">
              {config.final.signature}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Buttons after 2-second pause */}
      <div className="min-h-24 pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center justify-center gap-3">
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col gap-2.5"
            >
              <button
                onClick={() => goToScene(26)}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={16} />
                <span>OUR STORY VAULT</span>
              </button>

              <button
                onClick={restartExperience}
                className="w-full rounded-full bg-white/10 hover:bg-white/15 border border-white/15 p-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-all active:scale-95 backdrop-blur-md flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                <span>PLAY IT AGAIN</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
