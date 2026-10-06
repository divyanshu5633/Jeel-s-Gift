import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Plane, Home, Infinity as InfinityIcon, ArrowRight, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene22TheNextChapter: React.FC = () => {
  const { config, nextScene } = useStory();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSelect = (idx: number) => {
    sounds.playTap();
    setSelectedIdx(idx);
  };

  const currentItem = config.timeline[selectedIdx];

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Compass':
        return <Compass size={22} />;
      case 'Plane':
        return <Plane size={22} />;
      case 'Home':
        return <Home size={22} />;
      default:
        return <InfinityIcon size={22} />;
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#1a1428] via-[#0d0a17] to-black overflow-hidden">
      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>UNWRITTEN PAGES</span>
        </motion.div>

        <h2 className="font-cinzel text-3xl font-bold tracking-widest text-white">
          THE NEXT CHAPTER
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 italic">
          This is the part we haven’t written yet.
        </p>
      </div>

      {/* Horizontal Interactive Timeline Tabs */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10 py-4">
        {/* Years selector rail */}
        <div className="flex w-full items-center justify-between gap-1 rounded-2xl bg-white/5 border border-white/10 p-1.5 backdrop-blur-md">
          {config.timeline.map((item, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <button
                key={item.year}
                onClick={() => handleSelect(idx)}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-102'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Selected Chapter Card */}
        <div className="mt-6 w-full min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.year}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-[#19152b] border border-rose-500/30 p-6 text-center shadow-2xl backdrop-blur-md flex flex-col items-center justify-center"
            >
              <div
                style={{
                  backgroundColor: `${currentItem.color}25`,
                  color: currentItem.color,
                  borderColor: `${currentItem.color}50`,
                }}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg"
              >
                {getIcon(currentItem.icon)}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300">
                {currentItem.subtitle}
              </span>

              <h3 className="mt-1 font-cinzel text-xl font-bold text-white">
                {currentItem.title}
              </h3>

              <div className="my-3 h-px w-16 bg-white/10" />

              <p className="text-sm text-neutral-300 italic leading-relaxed">
                "{currentItem.description}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Button to Bucket List */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={nextScene}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>FUTURE BUCKET LIST</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
