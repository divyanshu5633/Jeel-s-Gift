import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Lock, Unlock, ArrowRight, X } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene16SecretDiscovery: React.FC = () => {
  const { config, nextScene, discoveredSecrets, discoverSecret } = useStory();
  const [activeSecretModal, setActiveSecretModal] = useState<typeof config.secrets[0] | null>(null);

  const handleOpenSecret = (secret: typeof config.secrets[0]) => {
    discoverSecret(secret.id);
    setActiveSecretModal(secret);
  };

  const allFound = discoveredSecrets.length === config.secrets.length;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#120a16] via-[#07050a] to-black overflow-hidden">
      {/* Secret Reveal Modal */}
      <AnimatePresence>
        {activeSecretModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSecretModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs rounded-3xl bg-[#1a1426] border border-rose-500/40 p-6 text-center shadow-[0_0_40px_rgba(244,63,94,0.3)]"
            >
              <button
                onClick={() => setActiveSecretModal(null)}
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X size={16} />
              </button>

              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
                <Unlock size={24} />
              </div>

              <span className="text-[11px] font-bold tracking-[0.2em] text-rose-400 uppercase">
                {activeSecretModal.number}
              </span>

              <h4 className="mt-2 font-cinzel text-base font-bold text-white">
                {activeSecretModal.title}
              </h4>

              <div className="my-3 h-px w-16 bg-rose-500/30 mx-auto" />

              <p className="text-sm text-neutral-200 italic leading-relaxed">
                "{activeSecretModal.content}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-rose-300 font-semibold mb-2"
        >
          WAIT A SECOND...
        </motion.p>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white">
          YOU DIDN'T THINK THAT WAS EVERYTHING?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 italic">
          There are 3 secrets hidden in this room. Tap around to find them.
        </p>

        {/* Counter */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-rose-300">
          <Sparkles size={13} className="text-amber-400" />
          <span>PROGRESS: {discoveredSecrets.length} / 3 SECRETS DISCOVERED</span>
        </div>
      </div>

      {/* Interactive Discovery Space with Floating Secrets */}
      <div className="relative my-auto h-[320px] w-full max-w-xs mx-auto z-10">
        {/* Secret 1: Tiny Heart (Top-Left) */}
        <motion.button
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          onClick={() => handleOpenSecret(config.secrets[0])}
          className={`absolute top-6 left-6 p-4 rounded-full transition-all cursor-pointer ${
            discoveredSecrets.includes(config.secrets[0].id)
              ? 'bg-rose-500/30 border border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.6)]'
              : 'bg-white/10 border border-white/20 text-rose-400/80 hover:bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
          }`}
          aria-label="Secret 1"
        >
          <Heart size={20} className="fill-rose-400" />
        </motion.button>

        {/* Secret 2: Small Star (Top-Right / Middle) */}
        <motion.button
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 45, 90, 0],
          }}
          transition={{ repeat: Infinity, duration: 3.2 }}
          onClick={() => handleOpenSecret(config.secrets[1])}
          className={`absolute top-28 right-8 p-4 rounded-full transition-all cursor-pointer ${
            discoveredSecrets.includes(config.secrets[1].id)
              ? 'bg-amber-500/30 border border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
              : 'bg-white/10 border border-white/20 text-amber-400/80 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
          }`}
          aria-label="Secret 2"
        >
          <Sparkles size={20} className="fill-amber-400" />
        </motion.button>

        {/* Secret 3: Tiny Envelope (Bottom-Center) */}
        <motion.button
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -6, 0],
          }}
          transition={{ repeat: Infinity, duration: 2.8 }}
          onClick={() => handleOpenSecret(config.secrets[2])}
          className={`absolute bottom-6 left-24 p-4 rounded-full transition-all cursor-pointer ${
            discoveredSecrets.includes(config.secrets[2].id)
              ? 'bg-purple-500/30 border border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
              : 'bg-white/10 border border-white/20 text-purple-400/80 hover:bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
          }`}
          aria-label="Secret 3"
        >
          <Mail size={20} className="text-purple-300" />
        </motion.button>

        {/* Center decorative lock orb */}
        <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 pointer-events-none">
          {allFound ? (
            <Unlock size={28} className="text-rose-400 animate-bounce" />
          ) : (
            <Lock size={28} className="text-neutral-500" />
          )}
          <span className="text-[10px] mt-1 font-semibold uppercase">
            {allFound ? 'OPEN' : 'VAULT'}
          </span>
        </div>
      </div>

      {/* Completion Button */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 text-center"
            >
              <p className="text-xs text-rose-300 font-semibold tracking-wider uppercase">
                You found everything.
              </p>
              <button
                onClick={nextScene}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>ONE LAST THING</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
