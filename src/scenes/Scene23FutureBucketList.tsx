import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene23FutureBucketList: React.FC = () => {
  const { config, nextScene, checkedBucketItems, toggleBucketItem } = useStory();

  const handleCheck = (id: string, isSpecial?: boolean) => {
    toggleBucketItem(id);

    if (isSpecial) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#fb7185', '#fef08a'],
      });
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#191024] via-[#0c0914] to-black overflow-y-auto">
      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>OUR PROMISES</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white leading-tight">
          THINGS I WANT TO DO WITH YOU
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          Tap items to check them off together
        </p>
      </div>

      {/* Interactive Bucket List Cards */}
      <div className="my-auto grid grid-cols-1 gap-2.5 max-w-sm mx-auto w-full py-4 z-10">
        {config.bucketList.map((item, idx) => {
          const isChecked = checkedBucketItems.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleCheck(item.id, item.isSpecial)}
              className={`flex items-center gap-3.5 rounded-2xl p-3.5 cursor-pointer border transition-all active:scale-[0.98] ${
                item.isSpecial
                  ? isChecked
                    ? 'bg-rose-500/25 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                    : 'bg-gradient-to-r from-rose-950/40 to-purple-950/40 border-rose-500/30 hover:border-rose-400/60'
                  : isChecked
                  ? 'bg-[#1e172e] border-rose-500/50 text-white'
                  : 'bg-[#151222]/80 border-white/8 text-neutral-300 hover:border-white/20'
              }`}
            >
              {/* Checkbox box */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isChecked
                    ? 'bg-rose-500 border-rose-400 text-white shadow-sm'
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

              {/* Text */}
              <div className="flex-1">
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
                  className={`shrink-0 ${
                    isChecked ? 'text-rose-400 fill-rose-400 animate-pulse' : 'text-rose-400/60'
                  }`}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={nextScene}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>CONTINUE</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
