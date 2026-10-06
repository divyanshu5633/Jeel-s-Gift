import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene12PrivateMessage: React.FC = () => {
  const { nextScene } = useStory();
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    if (isUnlocked) return;
    setIsHolding(true);
    sounds.playTap();

    holdIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          setIsUnlocked(true);
          sounds.playUnlock();
          setTimeout(() => {
            nextScene();
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 75); // ~1.5s to reach 100%
  };

  const endHold = () => {
    if (isUnlocked) return;
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  // SVG circular radius
  const size = 140;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between p-8 text-center select-none bg-black overflow-hidden">
      <div className="pt-8" />

      {/* Center locked prompt */}
      <div className="my-auto flex flex-col items-center max-w-xs z-10">
        <motion.div
          animate={{ scale: isUnlocked ? 1.2 : 1 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-900 border border-white/10 text-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.2)]"
        >
          {isUnlocked ? <Unlock size={36} /> : <Lock size={36} />}
        </motion.div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-white">
          {isUnlocked ? 'UNLOCKED' : 'PRIVATE MESSAGE'}
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-neutral-400 italic">
          This one isn’t meant to be read.
        </p>

        {/* Circular Hold Button */}
        <div className="mt-10 relative flex items-center justify-center">
          <svg className="h-[140px] w-[140px] -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#f43f5e"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-75"
            />
          </svg>

          {/* Interactive Core Button */}
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className={`absolute flex h-24 w-24 flex-col items-center justify-center rounded-full transition-transform active:scale-95 focus:outline-hidden ${
              isHolding
                ? 'bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.7)] scale-95'
                : 'bg-neutral-900 border border-white/20 text-neutral-200 hover:border-rose-400/50'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {isUnlocked ? 'DONE' : isHolding ? 'HOLDING...' : 'HOLD'}
            </span>
            <span className="text-[10px] opacity-70">
              {isUnlocked ? '100%' : `${progress}%`}
            </span>
          </button>
        </div>

        <p className="mt-4 text-[11px] text-neutral-500">
          Press and hold to decode audio transmission
        </p>
      </div>

      <div className="pb-6" />
    </div>
  );
};
