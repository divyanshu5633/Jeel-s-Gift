import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Sparkles, ArrowRight, X, Heart, ShieldAlert } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';
import type { StoryVaultItem } from '../../types';

export const Scene06OurStoryVault: React.FC = () => {
  const { config, nextScene, unlockedVaultItems, unlockVaultItem } = useStory();
  const [selectedItem, setSelectedItem] = useState<StoryVaultItem | null>(null);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const handleOpenItem = (item: StoryVaultItem) => {
    if (item.isLocked && !unlockedVaultItems.includes(item.id)) {
      sounds.playWrong();
      setLockedNotice(item.lockHint || 'Encrypted secret item');
      setTimeout(() => setLockedNotice(null), 3000);
      return;
    }

    sounds.playUnlock();
    unlockVaultItem(item.id);
    setSelectedItem(item);
  };

  const handleContinue = () => {
    sounds.playCameraSnap();
    nextScene();
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-4 sm:p-5 select-none bg-radial from-[#130d22] via-[#080612] to-black pb-24">
      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>CHAPTER 06 • PRIVATE ARCHIVE</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
          OUR STORY VAULT
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          Tap any card to view dossier • Scroll down for more
        </p>
      </div>

      {/* Locked Notice Alert */}
      <AnimatePresence>
        {lockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="my-2 max-w-sm mx-auto w-full rounded-xl bg-rose-950/80 border border-rose-500/50 p-3 text-center text-xs text-rose-200 flex items-center justify-center gap-2 shadow-xl backdrop-blur-md"
          >
            <ShieldAlert size={16} className="text-rose-400 shrink-0" />
            <span>{lockedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Cards Grid */}
      <div className="my-auto grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm sm:max-w-md mx-auto w-full py-4 z-10">
        {config.storyVault.map((item, idx) => {
          const isItemUnlocked = !item.isLocked || unlockedVaultItems.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => handleOpenItem(item)}
              className={`rounded-2xl p-4 border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px] active:scale-[0.98] ${
                isItemUnlocked
                  ? 'bg-[#151125]/90 border-white/10 hover:border-rose-400/40 shadow-lg'
                  : 'bg-[#0e0c18]/80 border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">
                  {item.category}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    isItemUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {isItemUnlocked ? <Unlock size={12} /> : <Lock size={12} />}
                </span>
              </div>

              <div className="mt-2">
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-neutral-400 line-clamp-1 italic">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                <span>{item.date}</span>
                <span className="text-rose-300/80 font-medium">{item.tag || 'Dossier'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Memory Dossier Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="w-full max-w-sm rounded-3xl bg-[#171328] border border-rose-500/30 p-5 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white cursor-pointer active:scale-95"
                aria-label="Close Dossier"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">
                <span>{selectedItem.category}</span>
                <span>•</span>
                <span>{selectedItem.date}</span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                {selectedItem.title}
              </h3>

              {selectedItem.previewImage && (
                <div className="aspect-16/9 w-full rounded-2xl overflow-hidden my-3 border border-white/10 bg-black">
                  <img
                    src={selectedItem.previewImage}
                    alt={selectedItem.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-neutral-200 italic leading-relaxed mt-2 bg-white/5 p-3 rounded-xl border border-white/5">
                "{selectedItem.story}"
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-rose-300">
                  <Heart size={14} className="fill-rose-400 text-rose-400" />
                  <span>Archived memory</span>
                </span>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 px-4 py-1.5 text-xs font-semibold text-rose-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALWAYS VISIBLE STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-md max-w-lg mx-auto w-full">
        <button
          onClick={handleContinue}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>CONTINUE TO POLAROID FLASHBACKS</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
