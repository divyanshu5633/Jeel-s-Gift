import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ArrowRight, Volume2 } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene13VoiceMessage: React.FC = () => {
  const { config, nextScene, voicePlaying, voiceProgress, toggleVoicePlay } = useStory();

  const totalDuration = config.voiceMessage.durationSeconds;
  const currentSeconds = Math.floor(totalDuration * voiceProgress);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isFinished = voiceProgress >= 0.95;

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#150d18] via-[#09070f] to-black overflow-hidden">
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-rose-300 font-semibold">
          AUDIO MEMO
        </span>
      </div>

      {/* Profile & Audio Player */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full z-10">
        {/* Profile Avatar */}
        <motion.div
          animate={{
            scale: voicePlaying ? [1, 1.05, 1] : 1,
            boxShadow: voicePlaying
              ? '0 0 35px rgba(244,63,94,0.5)'
              : '0 0 15px rgba(255,255,255,0.05)',
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-rose-500/40 p-1"
        >
          <img
            src={config.voiceMessage.avatar}
            alt={config.voiceMessage.senderName}
            className="h-full w-full rounded-full object-cover"
          />
          {voicePlaying && (
            <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow">
              <Volume2 size={12} className="animate-pulse" />
            </span>
          )}
        </motion.div>

        <h3 className="mt-4 font-cinzel text-lg font-bold text-white tracking-wide">
          A message from {config.voiceMessage.senderName}
        </h3>
        <p className="mt-1 text-xs text-rose-300/80 italic">
          {config.voiceMessage.placeholderNote}
        </p>

        {/* Dynamic Waveform Player Card */}
        <div className="mt-8 w-full rounded-3xl bg-[#171424] border border-white/10 p-5 shadow-2xl backdrop-blur-md">
          {/* Waveform bars */}
          <div className="flex h-16 items-center justify-between gap-1 px-1">
            {config.voiceMessage.waveformBars.map((height, idx) => {
              const barProgress = idx / config.voiceMessage.waveformBars.length;
              const isPassed = voiceProgress >= barProgress;

              return (
                <motion.div
                  key={idx}
                  animate={{
                    height: voicePlaying
                      ? `${Math.max(14, (height * (0.6 + Math.random() * 0.5)))}%`
                      : `${height}%`,
                  }}
                  transition={{ duration: 0.15 }}
                  style={{
                    backgroundColor: isPassed ? '#f43f5e' : 'rgba(255, 255, 255, 0.15)',
                  }}
                  className="w-1.5 rounded-full transition-colors duration-150"
                />
              );
            })}
          </div>

          {/* Time scrubber */}
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>{formatTime(currentSeconds)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>

          {/* Play/Pause control */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={toggleVoicePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-transform"
              aria-label={voicePlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {voicePlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
            </button>
          </div>
        </div>

        {/* Transcript preview */}
        <div className="mt-6 rounded-2xl bg-white/5 border border-white/5 p-4 text-center max-w-xs">
          <p className="text-xs text-neutral-300 italic leading-relaxed">
            {config.voiceMessage.transcript}
          </p>
        </div>
      </div>

      {/* Completion section */}
      <div className="min-h-16 pb-6 max-w-xs mx-auto w-full z-10">
        <AnimatePresence>
          {(isFinished || voiceProgress > 0.2) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 text-center"
            >
              <p className="text-xs text-rose-300 font-medium">
                Some things are better heard than read.
              </p>
              <button
                onClick={nextScene}
                className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>KEEP GOING</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
