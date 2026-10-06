import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Heart, Wind } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene09LetterAndCandle: React.FC = () => {
  const { config, nextScene, candleExtinguished, extinguishCandle } = useStory();
  const [phase, setPhase] = useState<'envelope' | 'letterOpen' | 'foldingBack' | 'candle' | 'wished'>('envelope');
  const [candleTaps, setCandleTaps] = useState(0);

  const handleOpenLetter = () => {
    sounds.playTap();
    setPhase('letterOpen');

    // After letting the user read the short letter (~7 seconds), fold back into envelope and reveal candle!
    setTimeout(() => {
      setPhase('foldingBack');
      setTimeout(() => {
        setPhase('candle');
      }, 900);
    }, 6500);
  };

  const handleBlowCandle = () => {
    if (candleExtinguished) return;

    const newTaps = candleTaps + 1;
    setCandleTaps(newTaps);
    sounds.playTap();

    if (newTaps >= 2) {
      extinguishCandle();
      setPhase('wished');

      // Darkness reveals gift box in next scene after poetic text
      setTimeout(() => {
        nextScene();
      }, 5000);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-black text-center overflow-hidden">
      <div className="pt-6" />

      {/* PHASE 1 & 2: LETTER */}
      {(phase === 'envelope' || phase === 'letterOpen' || phase === 'foldingBack') && (
        <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold mb-4">
            {config.letterAndCandle.letterPrompt}
          </p>

          {/* Envelope & Letter */}
          <div className="relative h-60 w-72 flex items-center justify-center">
            {phase === 'envelope' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-48 w-68 rounded-2xl bg-[#e5d5be] shadow-2xl border border-[#d6be9d] flex flex-col items-center justify-center p-4 relative"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white shadow-md mb-2">
                  <Heart size={20} className="fill-white" />
                </div>
                <p className="font-handwriting text-2xl text-neutral-800">
                  For {config.recipient}
                </p>
              </motion.div>
            ) : (
              /* Open Letter Sheet */
              <motion.div
                initial={{ scale: 0.8, y: 30, opacity: 0 }}
                animate={{
                  scale: phase === 'foldingBack' ? 0.7 : 1,
                  y: phase === 'foldingBack' ? 40 : 0,
                  opacity: phase === 'foldingBack' ? 0 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="w-full rounded-3xl paper-texture p-6 text-neutral-900 shadow-2xl border border-[#e8dac1]"
              >
                <p className="font-handwriting text-2xl font-bold text-neutral-900 mb-2">
                  {config.letterAndCandle.greeting}
                </p>
                <div className="space-y-2 font-handwriting text-xl text-neutral-800 leading-relaxed">
                  {config.letterAndCandle.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="mt-4 text-right font-handwriting text-2xl font-bold text-rose-700">
                  {config.letterAndCandle.signature}
                </p>
              </motion.div>
            )}
          </div>

          {phase === 'envelope' && (
            <div className="mt-6 w-full max-w-xs">
              <button
                onClick={handleOpenLetter}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                <span>OPEN</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: CANDLE */}
      {phase === 'candle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10"
        >
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white">
            {config.letterAndCandle.candlePrompt}
          </h2>
          <p className="mt-1 text-xs text-neutral-400 italic">
            Tap or hold flame to blow out candle
          </p>

          {/* Candle & Flame */}
          <div
            onClick={handleBlowCandle}
            className="my-8 flex flex-col items-center cursor-pointer active:scale-95 group"
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute -inset-6 rounded-full bg-amber-500/30 blur-2xl animate-pulse" />
              <div className="h-14 w-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flicker shadow-[0_0_25px_rgba(251,191,36,0.9)] relative" />
            </div>
            <div className="h-4 w-1 bg-neutral-800 -mt-1" />
            <div className="h-24 w-7 rounded-t-lg bg-gradient-to-r from-rose-200 to-rose-300 shadow-md border border-rose-200" />
            <div className="h-10 w-36 rounded-2xl bg-neutral-900 border-t-2 border-rose-400/50 shadow-xl" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Wind size={13} className="text-amber-300 animate-pulse" />
            <span>Tap flame ({2 - candleTaps} left)</span>
          </div>
        </motion.div>
      )}

      {/* PHASE 4: WISHED (Black screen poetic sequence) */}
      {phase === 'wished' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-auto flex flex-col items-center max-w-xs mx-auto w-full space-y-6 z-10"
        >
          {config.letterAndCandle.wishThoughts.map((thought, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 1.2, duration: 0.8 }}
              className={`tracking-wide ${
                idx === config.letterAndCandle.wishThoughts.length - 1
                  ? 'font-cinzel text-2xl font-bold text-rose-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                  : 'text-base font-light text-neutral-300'
              }`}
            >
              {thought}
            </motion.p>
          ))}
        </motion.div>
      )}

      <div className="pb-6" />
    </div>
  );
};
