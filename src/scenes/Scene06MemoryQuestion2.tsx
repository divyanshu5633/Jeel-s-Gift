import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene06MemoryQuestion2: React.FC = () => {
  const { config, nextScene } = useStory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [isHeartExpanding, setIsHeartExpanding] = useState(false);

  const handleSelect = (option: typeof config.question2.options[0]) => {
    setSelectedId(option.id);
    sounds.playCorrect();
    setFeedbackShown(true);

    // Heart expands into next scene
    setTimeout(() => {
      setIsHeartExpanding(true);
      setTimeout(() => {
        nextScene();
      }, 900);
    }, 1800);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 bg-[#090812] text-center select-none overflow-hidden">
      {/* Floating glowing heart expanding into next scene */}
      <AnimatePresence>
        {isHeartExpanding && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 30, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="h-24 w-24 rounded-full bg-rose-500/40 blur-xl" />
            <Heart size={48} className="text-rose-500 fill-rose-500 absolute" />
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
          <span>QUESTION 02</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 font-cinzel text-3xl font-semibold text-white tracking-wide"
        >
          {config.question2.question}
        </motion.h2>
      </div>

      {/* Options */}
      <div className="my-auto grid grid-cols-1 gap-3 max-w-sm mx-auto w-full py-4">
        {config.question2.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: selectedId && !isSelected ? 0.3 : 1,
                scale: isSelected ? 1.04 : 1,
              }}
              transition={{ delay: idx * 0.1 }}
              disabled={selectedId !== null}
              onClick={() => handleSelect(opt)}
              className={`flex items-center justify-between rounded-2xl p-4 text-left border transition-all active:scale-[0.98] ${
                isSelected
                  ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.35)] text-white'
                  : 'bg-[#151525]/80 border-white/8 text-neutral-200 hover:border-white/20 hover:bg-[#1a1a30]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base font-medium">{opt.text}</span>
              </div>
              {isSelected && (
                <Heart size={18} className="text-rose-400 fill-rose-400 animate-bounce" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner */}
      <div className="min-h-16 flex items-center justify-center pb-6">
        <AnimatePresence>
          {feedbackShown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-base font-semibold text-rose-300">
                {config.question2.feedback}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {config.question2.subtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
