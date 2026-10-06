import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene05MemoryQuestion1: React.FC = () => {
  const { config, nextScene } = useStory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongShakeId, setWrongShakeId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (option: typeof config.question1.options[0]) => {
    setSelectedId(option.id);

    if (option.isCorrect) {
      setIsCorrect(true);
      sounds.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fcd34d'],
      });

      // Zoom photo and proceed
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          nextScene();
        }, 1100);
      }, 1600);
    } else {
      setIsCorrect(false);
      sounds.playWrong();
      setWrongShakeId(option.id);
      setTimeout(() => {
        setWrongShakeId(null);
      }, 600);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 bg-[#0a0810] text-center select-none overflow-hidden">
      {/* Zooming photo transition on correct answer */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2.2, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          >
            <img
              src={config.question1.image}
              alt="Memory 1"
              className="h-full w-full object-cover filter brightness-90"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-8 max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs text-rose-300 font-medium"
        >
          <Sparkles size={12} />
          <span>QUESTION 01</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 font-cinzel text-2xl sm:text-3xl font-semibold text-white tracking-wide"
        >
          {config.question1.question}
        </motion.h2>
      </div>

      {/* Options Cards */}
      <div className="my-auto grid grid-cols-1 gap-3 max-w-sm mx-auto w-full py-4">
        {config.question1.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          const isWrong = wrongShakeId === opt.id;
          const showFade = isCorrect && !opt.isCorrect;

          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: showFade ? 0.2 : 1,
                x: isWrong ? [0, -10, 10, -8, 8, 0] : 0,
                scale: isSelected && isCorrect ? 1.05 : 1,
              }}
              transition={{
                delay: idx * 0.1,
                x: { duration: 0.4 },
              }}
              disabled={isCorrect === true}
              onClick={() => handleSelect(opt)}
              className={`group flex items-center justify-between rounded-2xl p-4 text-left border transition-all active:scale-[0.98] ${
                isSelected && isCorrect
                  ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.4)] text-white'
                  : isWrong
                  ? 'bg-red-950/40 border-red-500/60 text-red-200'
                  : 'bg-[#151522]/80 border-white/8 text-neutral-200 hover:border-white/20 hover:bg-[#1a1a2b]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold ${
                    isSelected && isCorrect
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/5 text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base font-medium">{opt.text}</span>
              </div>
              {isSelected && isCorrect && (
                <Heart size={18} className="text-rose-400 fill-rose-400 animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner */}
      <div className="min-h-16 flex items-center justify-center pb-6">
        <AnimatePresence mode="wait">
          {isCorrect === true && (
            <motion.div
              key="correct"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-lg font-semibold text-rose-300">
                {config.question1.correctFeedback}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {config.question1.correctSubtext}
              </p>
            </motion.div>
          )}

          {isCorrect === false && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-sm font-medium text-amber-300">
                {config.question1.wrongFeedback}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                {config.question1.wrongSubtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
