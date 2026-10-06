import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene10PolaroidStack: React.FC = () => {
  const { config, nextScene } = useStory();
  const [cards, setCards] = useState(config.polaroids);
  const [activeModal, setActiveModal] = useState<typeof config.polaroids[0] | null>(null);

  const handleSwipeAway = () => {
    sounds.playCameraSnap();
    setCards((prev) => prev.slice(1));
  };

  const isStackEmpty = cards.length === 0;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#150d18] via-[#09070f] to-black overflow-hidden">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-neutral-900 border border-white/10 p-4 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md active:scale-95"
              >
                <X size={18} />
              </button>

              <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={activeModal.image}
                  alt={activeModal.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 p-2 text-center">
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                  {activeModal.date}
                </span>
                <h4 className="mt-1 font-cinzel text-lg font-bold text-white">
                  {activeModal.title}
                </h4>
                <p className="mt-2 text-sm text-neutral-300 italic leading-relaxed">
                  "{activeModal.caption}"
                </p>
                {activeModal.location && (
                  <p className="mt-2 text-[11px] text-neutral-500">
                    📍 {activeModal.location}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>MEMORY STACK</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white">
          POLAROID ARCHIVES
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          Swipe cards away or tap to view full screen
        </p>
      </div>

      {/* Polaroid Deck */}
      <div className="relative my-auto flex h-[390px] w-full max-w-xs mx-auto items-center justify-center z-10">
        {!isStackEmpty ? (
          cards.map((polaroid, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={polaroid.id}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90) {
                    handleSwipeAway();
                  }
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1 - index * 0.04,
                  y: index * 9,
                  rotate: polaroid.rotation + (index % 2 === 0 ? 1 : -1),
                  opacity: 1 - index * 0.2,
                }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: 10 - index }}
                className="absolute w-full rounded-2xl bg-white p-3.5 pb-6 text-neutral-900 shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing border border-neutral-100"
              >
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 cursor-pointer group"
                  onClick={() => setActiveModal(polaroid)}
                >
                  <img
                    src={polaroid.image}
                    alt={polaroid.title}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                      <Maximize2 size={12} />
                      <span>Expand</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
                    <Heart size={10} className="fill-rose-600" />
                    <span>{polaroid.date}</span>
                  </div>
                  <h4 className="mt-1 font-cinzel text-sm font-bold text-neutral-900">
                    {polaroid.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-neutral-600 italic line-clamp-2">
                    "{polaroid.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          /* Empty Stack Completed Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 rounded-3xl bg-[#171424] border border-rose-500/30 shadow-2xl"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <Heart size={24} className="fill-rose-500" />
            </div>
            <p className="font-cinzel text-lg font-bold text-white">
              Some memories deserve more than a photo.
            </p>
            <p className="mt-2 text-xs text-neutral-400 italic">
              They live forever in the way you made me feel.
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        {!isStackEmpty ? (
          <button
            onClick={handleSwipeAway}
            className="w-full rounded-full bg-white/10 hover:bg-white/15 border border-white/15 p-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-200 transition-all active:scale-95 backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span>Swipe Card ({cards.length} left)</span>
          </button>
        ) : (
          <button
            onClick={nextScene}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>CONTINUE</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
