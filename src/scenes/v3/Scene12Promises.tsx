import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const Scene12Promises: React.FC = () => {
  const { config, nextScene, checkedPromises, togglePromise } = useStory();

  const handleToggle = (id: string, isSpecial?: boolean) => {
    togglePromise(id);

    if (isSpecial) {
      confetti({
        particleCount: 28,
        spread: 50,
        origin: { y: 0.75 },
        colors: ['#f43f5e', '#fb7185', '#fef08a'],
      });
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-4 sm:p-5 select-none bg-radial from-[#191024] via-[#0c0914] to-black overflow-y-auto pb-28">
      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={11} />
          <span>CHAPTER 12 • PROMISES & DREAMS</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white leading-tight">
          THINGS I WANT TO DO WITH YOU
        </h2>

        <div className="mt-2 text-xs text-neutral-300 italic space-y-0.5">
          <p>Not everything on this list has happened yet.</p>
          <p className="text-rose-300 font-medium">And honestly... that's my favourite part.</p>
        </div>

        <p className="mt-2 text-[11px] text-neutral-400">
          Tap items to check them off ({checkedPromises.length} / {config.promises.length} checked)
        </p>
      </div>

      {/* 10 Interactive Promises Cards */}
      <div className="my-auto grid grid-cols-1 gap-2.5 max-w-sm mx-auto w-full py-4 z-10">
        {config.promises.map((item, idx) => {
          const isChecked = checkedPromises.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleToggle(item.id, item.isSpecial)}
              className={`flex items-start gap-3 rounded-2xl p-3.5 cursor-pointer border transition-all active:scale-[0.98] ${
                item.isSpecial
                  ? isChecked
                    ? 'bg-rose-500/25 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                    : 'bg-gradient-to-r from-rose-950/35 to-purple-950/35 border-rose-500/30 hover:border-rose-400/50'
                  : isChecked
                  ? 'bg-[#1e172e] border-rose-500/50 text-white'
                  : 'bg-[#151222]/85 border-white/8 text-neutral-300 hover:border-white/20'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border mt-0.5 transition-all ${
                  isChecked
                    ? 'bg-rose-500 border-rose-400 text-white shadow-xs'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              {/* Text & Special Note */}
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {item.category && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded-sm">
                      {item.category}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium leading-snug transition-all ${
                    isChecked ? 'text-rose-100 line-through opacity-85' : 'text-neutral-200'
                  }`}
                >
                  {item.text}
                </span>

                {item.isSpecial && isChecked && item.specialResponse && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-1 text-[11px] font-semibold text-rose-300 italic"
                  >
                    ✦ {item.specialResponse}
                  </motion.p>
                )}
              </div>

              {item.isSpecial && (
                <Heart
                  size={16}
                  className={`shrink-0 mt-0.5 ${
                    isChecked ? 'text-rose-400 fill-rose-400 animate-pulse' : 'text-rose-400/60'
                  }`}
                />
              )}
            </motion.div>
          );
        })}

        <div className="text-center pt-2 pb-1">
          <p className="text-xs text-neutral-400 italic">
            This list isn't finished yet. I want to keep adding to it with you.
          </p>
        </div>
      </div>

      {/* STICKY BOTTOM PROGRESSION BAR - NEVER STUCK */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-md max-w-lg mx-auto w-full">
        <button
          onClick={nextScene}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>ONE LAST THING... (SURPRISE GIFT)</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
