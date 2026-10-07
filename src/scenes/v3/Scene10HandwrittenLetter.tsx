import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene10HandwrittenLetter: React.FC = () => {
  const { config, nextScene } = useStory();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterUnfolded, setLetterUnfolded] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(1);
  const [isFolding, setIsFolding] = useState(false);

  // Progressive handwriting reveal once letter is unfolded
  useEffect(() => {
    if (!letterUnfolded) return;

    const totalLines = config.letter.paragraphs.length + 2;
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < totalLines) {
          sounds.playTap();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [letterUnfolded, config.letter.paragraphs.length]);

  const handleOpenEnvelope = () => {
    sounds.playPaperRustle();
    setEnvelopeOpen(true);
    setTimeout(() => {
      setLetterUnfolded(true);
    }, 650);
  };

  const handleRevealAll = () => {
    setRevealedIndex(config.letter.paragraphs.length + 3);
  };

  const handleFoldAndContinue = () => {
    sounds.playFlameFlick();
    setIsFolding(true);
    setTimeout(() => {
      nextScene();
    }, 700);
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col justify-between p-4 sm:p-6 select-none bg-radial from-[#1e131d] via-[#0f0b12] to-black overflow-y-auto transition-all duration-700 ${
        isFolding ? 'opacity-0 scale-95 filter blur-xs' : ''
      }`}
    >
      {/* Header */}
      <div className="pt-6 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>CHAPTER 10 • KEEPSAKE LETTER</span>
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-white leading-tight">
          ONE THING I NEVER SAY ENOUGH
        </h2>
        <p className="mt-1 text-xs text-neutral-400 italic">
          {letterUnfolded
            ? 'Written by hand, from my heart.'
            : config.letter.envelopePrompt}
        </p>
      </div>

      {/* Main Container: Envelope OR Unfolded Letter */}
      <div className="my-auto flex flex-col items-center justify-center max-w-sm mx-auto w-full py-4 z-10">
        <AnimatePresence mode="wait">
          {!letterUnfolded ? (
            /* 3D Physical Envelope */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <div
                onClick={handleOpenEnvelope}
                className="relative h-60 w-80 max-w-[90vw] rounded-2xl bg-[#e5d5be] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(244,63,94,0.18)] flex flex-col items-center justify-end overflow-hidden border border-[#d6be9d] cursor-pointer group"
              >
                {/* Top Flap */}
                <motion.div
                  initial={false}
                  animate={{
                    rotateX: envelopeOpen ? 180 : 0,
                    transformOrigin: 'top center',
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 right-0 h-30 bg-[#d9c4a8] border-b border-[#c8b294] z-20"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                {/* Sliding Letter Peek */}
                <motion.div
                  initial={false}
                  animate={{
                    y: envelopeOpen ? -95 : 0,
                    opacity: envelopeOpen ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute top-8 w-64 h-38 paper-texture rounded-xl shadow-md border border-neutral-300 z-10 p-4 flex flex-col justify-center items-center text-center"
                >
                  <Heart size={20} className="text-rose-500 fill-rose-500 mb-1" />
                  <p className="font-handwriting text-2xl text-neutral-800">
                    For {config.recipient}
                  </p>
                  <div className="h-0.5 w-16 bg-rose-300 mt-1" />
                </motion.div>

                {/* Envelope Front Pocket */}
                <div
                  className="absolute inset-0 bg-[#e5d5be] z-15 pointer-events-none"
                  style={{
                    clipPath: 'polygon(0 100%, 50% 45%, 100% 100%, 0 100%)',
                  }}
                />

                {/* Wax Seal */}
                {!envelopeOpen && (
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute top-22 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-800 to-rose-600 text-white shadow-xl border border-rose-400/60"
                  >
                    <Heart size={18} className="fill-white" />
                  </motion.div>
                )}
              </div>

              <div className="mt-8 w-full max-w-xs">
                <button
                  onClick={handleOpenEnvelope}
                  className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={16} />
                  <span>OPEN THE LETTER</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Realistic Handwritten Paper */
            <motion.div
              key="letter"
              onClick={handleRevealAll}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm rounded-3xl paper-texture p-7 sm:p-8 text-neutral-900 shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-[#e8dac1] relative cursor-pointer"
            >
              {/* Decorative Stamp */}
              <div className="absolute top-6 right-6 flex items-center justify-center h-11 w-11 rounded-full border-2 border-dashed border-rose-300 text-rose-500 opacity-70">
                <Heart size={18} className="fill-rose-300" />
              </div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: revealedIndex >= 1 ? 1 : 0 }}
                className="font-handwriting text-3xl font-bold text-neutral-900 mb-4"
              >
                {config.letter.greeting}
              </motion.p>

              {/* Paragraphs */}
              <div className="space-y-3.5 font-handwriting text-2xl text-neutral-800 leading-relaxed">
                {config.letter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: revealedIndex >= idx + 2 ? 1 : 0,
                      y: revealedIndex >= idx + 2 ? 0 : 8,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: revealedIndex >= config.letter.paragraphs.length + 2 ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-right font-handwriting text-2xl font-bold text-rose-900"
              >
                <p>{config.letter.closing}</p>
                <p className="text-3xl text-rose-600 mt-1">{config.letter.signature}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guaranteed Visible Action Button */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10 flex flex-col items-center gap-2">
        {letterUnfolded ? (
          <button
            onClick={handleFoldAndContinue}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>FOLD LETTER & MAKE A WISH</span>
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            onClick={handleOpenEnvelope}
            className="w-full rounded-full bg-white/10 hover:bg-white/15 text-neutral-300 border border-white/15 p-3 text-xs uppercase tracking-wider"
          >
            <span>Tap to read letter →</span>
          </button>
        )}
      </div>
    </div>
  );
};
