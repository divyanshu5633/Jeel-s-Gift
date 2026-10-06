import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Play, Pause, ArrowRight, Volume2 } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene08VoiceMessage: React.FC = () => {
  const { config, nextScene, isPrivateUnlocked, setPrivateUnlocked, voicePlaying, voiceProgress, toggleVoicePlay } = useStory();
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isMeltToLetter, setIsMeltToLetter] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    if (isPrivateUnlocked) return;
    setIsHolding(true);
    sounds.playTap();

    holdIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          setPrivateUnlocked(true);
          sounds.playUnlock();
          return 100;
        }
        return prev + 6;
      });
    }, 80);
  };

  const endHold = () => {
    if (isPrivateUnlocked) return;
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

  const handleContinue = () => {
    setIsMeltToLetter(true);
    // Waveform melts into handwriting
    setTimeout(() => {
      nextScene();
    }, 700);
  };

  const size = 130;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const totalDuration = config.voiceMessage.durationSeconds;
  const currentSecs = Math.floor(totalDuration * voiceProgress);
  const formatTime = (secs: number) => `0:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div
      className={`relative flex min-h-dvh flex-col items-center justify-between p-6 select-none bg-black text-center overflow-hidden transition-all duration-700 ${
        isMeltToLetter ? 'opacity-0 scale-98 filter blur-xs' : ''
      }`}
    >
      <div className="pt-6" />

      {!isPrivateUnlocked ? (
        /* Part 1: Hold to Unlock */
        <div className="my-auto flex flex-col items-center max-w-xs z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-5 flex h-18 w-18 items-center justify-center rounded-3xl bg-neutral-900 border border-white/10 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
          >
            <Lock size={32} />
          </motion.div>

          <h2 className="font-cinzel text-2xl font-bold tracking-widest text-white">
            PRIVATE MESSAGE
          </h2>
          <p className="mt-2 text-xs text-neutral-400 italic">
            This one isn’t meant to be read.
          </p>

          <div className="mt-8 relative flex items-center justify-center">
            <svg className="h-[130px] w-[130px] -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
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

            <button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className={`absolute flex h-22 w-22 flex-col items-center justify-center rounded-full transition-transform active:scale-95 ${
                isHolding
                  ? 'bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.7)] scale-95'
                  : 'bg-neutral-900 border border-white/20 text-neutral-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isHolding ? 'HOLDING...' : 'HOLD TO UNLOCK'}
              </span>
              <span className="text-[9px] opacity-70 mt-0.5">{progress}%</span>
            </button>
          </div>
        </div>
      ) : (
        /* Part 2: Voice Audio Player */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-semibold mb-4">
            <Volume2 size={14} className={voicePlaying ? 'animate-pulse' : ''} />
            <span>A message from me</span>
          </div>

          {/* Waveform Card */}
          <div className="w-full rounded-3xl bg-[#141220] border border-white/10 p-5 shadow-2xl backdrop-blur-md">
            <div className="flex h-14 items-center justify-between gap-1 px-1">
              {config.voiceMessage.waveformBars.map((height, idx) => {
                const barProgress = idx / config.voiceMessage.waveformBars.length;
                const isPassed = voiceProgress >= barProgress;

                return (
                  <motion.div
                    key={idx}
                    animate={{
                      height: voicePlaying
                        ? `${Math.max(16, height * (0.6 + Math.random() * 0.5))}%`
                        : `${height}%`,
                    }}
                    transition={{ duration: 0.15 }}
                    style={{
                      backgroundColor: isPassed ? '#f43f5e' : 'rgba(255, 255, 255, 0.15)',
                    }}
                    className="w-1.5 rounded-full"
                  />
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>{formatTime(currentSecs)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={toggleVoicePlay}
                className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95"
              >
                {voicePlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-400 italic max-w-xs">
            {config.voiceMessage.transcript}
          </p>
        </motion.div>
      )}

      {/* Completion Button */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        <AnimatePresence>
          {isPrivateUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 text-center"
            >
              <p className="text-xs text-rose-300 font-medium">
                Some things are better heard than read.
              </p>
              <button
                onClick={handleContinue}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span>CONTINUE</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
