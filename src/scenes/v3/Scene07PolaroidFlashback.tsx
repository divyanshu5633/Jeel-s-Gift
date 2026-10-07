import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Sparkles, ArrowRight } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene07PolaroidFlashback: React.FC = () => {
  const { config, nextScene } = useStory();
  const [cards, setCards] = useState(config.polaroids);
  const [expandedPhoto, setExpandedPhoto] = useState<typeof config.polaroids[0] | null>(null);
  const [isScattering, setIsScattering] = useState(false);

  const handleNextCard = () => {
    sounds.playCameraSnap();
    if (cards.length > 1) {
      setCards((prev) => prev.slice(1));
    } else {
      setIsScattering(true);
      setTimeout(() => {
        nextScene();
      }, 650);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#160d19] via-[#08050e] to-black overflow-hidden">
      {/* Lightbox */}
      <AnimatePresence>
        {expandedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs rounded-3xl bg-neutral-900 border border-white/10 p-4 text-center shadow-2xl"
            >
              <button
                onClick={() => setExpandedPhoto(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white cursor-pointer active:scale-95"
                aria-label="Close Lightbox"
              >
                <X size={16} />
              </button>
              <img
                src={expandedPhoto.image}
                alt={expandedPhoto.memoryNumber}
                className="aspect-square w-full object-cover rounded-2xl"
              />
              <span className="mt-3 inline-block text-[10px] font-bold uppercase tracking-widest text-rose-400">
                {expandedPhoto.date}
              </span>
              <p className="mt-1 text-xs text-neutral-300 italic leading-relaxed">
                "{expandedPhoto.caption}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>CHAPTER 07 • PHYSICAL POLAROIDS</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-white">
          POLAROID FLASHBACK
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          Tap card or button to advance ({cards.length} snapshots remaining)
        </p>
      </div>

      {/* Stacked Polaroid Deck - Click or drag to advance */}
      <div className="relative my-auto flex h-[370px] w-full max-w-xs mx-auto items-center justify-center z-10">
        {cards.map((polaroid, index) => {
          const isTop = index === 0;

          return (
            <motion.div
              key={polaroid.id}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60) {
                  handleNextCard();
                }
              }}
              onClick={() => {
                if (isTop) handleNextCard();
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                isScattering
                  ? {
                      x: index % 2 === 0 ? 350 : -350,
                      y: 240,
                      rotate: index * 30,
                      opacity: 0,
                    }
                  : {
                      scale: 1 - index * 0.05,
                      y: index * 10,
                      rotate: polaroid.rotation,
                      opacity: 1 - index * 0.25,
                    }
              }
              transition={{ duration: 0.35 }}
              style={{ zIndex: 10 - index }}
              className="absolute w-full rounded-3xl bg-white p-3.5 pb-6 text-neutral-900 shadow-2xl border border-neutral-100 cursor-pointer touch-none select-none"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 pointer-events-none">
                <img
                  src={polaroid.image}
                  alt={polaroid.memoryNumber}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 text-center pointer-events-none">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                  <Heart size={10} className="fill-rose-600" />
                  <span>{polaroid.date}</span>
                </div>
                <h4 className="mt-0.5 font-cinzel text-sm font-bold text-neutral-900">
                  {polaroid.memoryNumber}
                </h4>
                <p className="mt-1 text-xs text-neutral-600 italic">
                  "{polaroid.caption}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Button - Always visible and responsive */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center gap-2">
        <button
          onClick={handleNextCard}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{cards.length > 1 ? `NEXT SNAPSHOT (${cards.length} LEFT)` : 'CONTINUE TO OUR DATA'}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
