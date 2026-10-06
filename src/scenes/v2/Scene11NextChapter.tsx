import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene11NextChapter: React.FC = () => {
  const { config, nextScene } = useStory();
  const [stepIdx, setStepIdx] = useState(0);

  const currentItem = config.futureIdeas[stepIdx];
  const isFinalStep = stepIdx === config.futureIdeas.length - 1;

  const handleNext = () => {
    sounds.playTap();
    if (!isFinalStep) {
      setStepIdx(stepIdx + 1);
    } else {
      nextScene();
    }
  };

  const handlePrev = () => {
    sounds.playTap();
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#1e122b] via-[#0d0914] to-black text-center overflow-hidden">
      {/* Header */}
      <div className="pt-6 max-w-sm mx-auto w-full z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] text-amber-300 font-semibold mb-2">
          <Sparkles size={11} />
          <span>IDEA 0{stepIdx + 1} / 03</span>
        </div>
        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white">
          THE NEXT CHAPTER
        </h2>
      </div>

      {/* 3 Future Ideas Sequence */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.title}
            initial={{ opacity: 0, x: 25, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -25, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl bg-[#171329] border border-rose-500/25 p-4 shadow-2xl backdrop-blur-md"
          >
            <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 p-2 text-center">
              <h3 className="font-cinzel text-xl font-bold text-white">
                {currentItem.title}
              </h3>
              <p className="mt-2 text-xs text-neutral-300 italic leading-relaxed">
                "{currentItem.description}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {isFinalStep && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-xs font-semibold text-amber-200 tracking-wide"
          >
            And that's the part I'm most excited about.
          </motion.p>
        )}
      </div>

      {/* Navigation */}
      <div className="pb-6 max-w-sm mx-auto w-full flex items-center justify-between gap-3 z-10">
        <button
          onClick={handlePrev}
          disabled={stepIdx === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white disabled:opacity-20 disabled:pointer-events-none active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95"
        >
          <span>{isFinalStep ? 'FINAL REVEAL' : 'NEXT IDEA'}</span>
          {isFinalStep ? <ArrowRight size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
};
