import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Scene00Preloader: React.FC = () => {
  const [dotIndex, setDotIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 4);
    }, 400);

    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1800);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center select-none overflow-hidden">
      {/* Background glow point expanding */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{
          scale: isReady ? 12 : 1,
          opacity: isReady ? 0.25 : 0.08,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-rose-600/30 blur-[80px]"
      />

      <div className="relative z-10 flex flex-col items-center max-w-xs">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="mb-8 text-rose-400/70"
        >
          <Sparkles size={28} />
        </motion.div>

        <motion.p
          key={isReady ? 'ready' : 'preparing'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-base sm:text-lg font-light tracking-wide text-neutral-300"
        >
          {isReady ? 'Ready.' : 'Preparing something for you...'}
        </motion.p>

        {/* Small progress indicator dots: ● ○ ○ ○ */}
        {!isReady && (
          <div className="mt-6 flex items-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`inline-block h-2 w-2 rounded-full transition-all duration-300 ${
                  dotIndex === idx
                    ? 'scale-125 bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                    : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>
        )}

        {isReady && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-6 h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_16px_rgba(244,63,94,1)] animate-ping"
          />
        )}
      </div>
    </div>
  );
};
