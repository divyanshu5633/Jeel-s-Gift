import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Maximize2, X } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene06PolaroidFlashback: React.FC = () => {
  const { config, nextScene } = useStory();
  const [cards, setCards] = useState(config.polaroids);
  const [expandedPhoto, setExpandedPhoto] = useState<typeof config.polaroids[0] | null>(null);
  const [isScattering, setIsScattering] = useState(false);

  const handleSwipeAway = () => {
    sounds.playCameraSnap();
    if (cards.length > 1) {
      setCards((prev) => prev.slice(1));
    } else {
      // Third card dismissed: Scatter and transform into statistics!
      setIsScattering(true);
      setTimeout(() => {
        nextScene();
      }, 700);
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
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white"
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
              <p className="mt-1 text-xs text-neutral-300 italic">"{expandedPhoto.caption}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-white">
          POLAROID FLASHBACK
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          Swipe cards away ({cards.length} left)
        </p>
      </div>

      {/* Polaroid Deck (Stack of 3) */}
      <div className="relative my-auto flex h-[360px] w-full max-w-xs mx-auto items-center justify-center z-10">
        {cards.map((polaroid, index) => {
          const isTop = index === 0;

          return (
            <motion.div
              key={polaroid.id}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80) {
                  handleSwipeAway();
                }
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                isScattering
                  ? {
                      x: index % 2 === 0 ? 300 : -300,
                      y: 200,
                      rotate: index * 25,
                      opacity: 0,
                    }
                  : {
                      scale: 1 - index * 0.05,
                      y: index * 10,
                      rotate: polaroid.rotation,
                      opacity: 1 - index * 0.25,
                    }
              }
              transition={{ duration: 0.3 }}
              style={{ zIndex: 10 - index }}
              className="absolute w-full rounded-3xl bg-white p-3.5 pb-6 text-neutral-900 shadow-2xl border border-neutral-100 cursor-grab active:cursor-grabbing"
            >
              <div
                className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer group"
                onClick={() => setExpandedPhoto(polaroid)}
              >
                <img
                  src={polaroid.image}
                  alt={polaroid.memoryNumber}
                  className="h-full w-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                    <Maximize2 size={11} />
                    <span>View</span>
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
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

      {/* Swipe Button / Helper */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={handleSwipeAway}
          className="w-full rounded-full bg-white/10 hover:bg-white/15 border border-white/15 py-3.5 text-xs uppercase tracking-widest text-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>SWIPE POLAROID</span>
        </button>
      </div>
    </div>
  );
};
