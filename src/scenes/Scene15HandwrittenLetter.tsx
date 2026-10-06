import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene15HandwrittenLetter: React.FC = () => {
  const { config, nextScene } = useStory();
  const [revealedIndex, setRevealedIndex] = useState(0);

  useEffect(() => {
    const totalLines = config.letter.paragraphs.length + 2; // greeting + paragraphs + signature
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < totalLines) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [config.letter.paragraphs]);

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-4 sm:p-6 select-none bg-radial from-[#18111a] via-[#0d0910] to-black overflow-y-auto">
      <div className="pt-6" />

      {/* Warm paper sheet container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="my-auto w-full max-w-sm mx-auto rounded-3xl paper-texture p-7 sm:p-8 text-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#e8dac1] relative"
      >
        {/* Subtle decorative stamp */}
        <div className="absolute top-6 right-6 flex items-center justify-center h-10 w-10 rounded-full border-2 border-dashed border-rose-300 text-rose-400 opacity-60">
          <Heart size={16} className="fill-rose-300" />
        </div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedIndex >= 1 ? 1 : 0 }}
          className="font-handwriting text-2xl sm:text-3xl font-bold text-neutral-900 mb-4"
        >
          {config.letter.greeting}
        </motion.p>

        {/* Paragraphs appearing sequentially */}
        <div className="space-y-3 font-handwriting text-xl sm:text-2xl text-neutral-800 leading-relaxed">
          {config.letter.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: revealedIndex >= idx + 2 ? 1 : 0,
                y: revealedIndex >= idx + 2 ? 0 : 8,
              }}
              transition={{ duration: 0.5 }}
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
          transition={{ duration: 0.7 }}
          className="mt-6 text-right font-handwriting text-2xl font-bold text-rose-900"
        >
          <p>{config.letter.closing}</p>
          <p className="text-3xl text-rose-600 mt-1">{config.letter.signature}</p>
        </motion.div>
      </motion.div>

      {/* Continue Button */}
      <div className="pt-6 pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={nextScene}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>CONTINUE</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
