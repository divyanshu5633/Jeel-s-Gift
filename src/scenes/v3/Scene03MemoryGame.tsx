import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';
import { MicroHint } from '../../components/MicroHint';

export const Scene03MemoryGame: React.FC = () => {
  const { config, nextScene } = useStory();
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrongShakeId, setWrongShakeId] = useState<string | null>(null);
  const [isMorphingIntoBalloon, setIsMorphingIntoBalloon] = useState(false);

  const questionsList = [
    config.questions.q1,
    config.questions.q2,
    ...(config.questions.q3 ? [config.questions.q3] : []),
  ];

  const activeQuestion = questionsList[currentQIndex];
  const isLastQuestion = currentQIndex === questionsList.length - 1;

  const handleSelect = (option: { id: string; isCorrect: boolean }) => {
    setSelectedId(option.id);

    if (option.isCorrect) {
      sounds.playCorrect();
      setFeedback(activeQuestion.correctFeedback || 'You remembered. ❤️');
      confetti({
        particleCount: 28,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#fda4af', '#fcd34d'],
      });

      if (!isLastQuestion) {
        setTimeout(() => {
          setSelectedId(null);
          setFeedback(null);
          setCurrentQIndex((prev) => prev + 1);
        }, 1100);
      } else {
        // Last question: Morph into floating balloon rising into Chapter 04!
        setTimeout(() => {
          setIsMorphingIntoBalloon(true);
          setTimeout(() => {
            nextScene();
          }, 850);
        }, 1200);
      }
    } else {
      sounds.playWrong();
      setFeedback(activeQuestion.wrongFeedback || 'Nope 😂 Try again.');
      setWrongShakeId(option.id);
      setTimeout(() => {
        setWrongShakeId(null);
      }, 500);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none bg-radial from-[#130b18] via-[#09060f] to-black text-center overflow-hidden">
      {/* Morphing into balloon transition */}
      <AnimatePresence>
        {isMorphingIntoBalloon && (
          <motion.div
            initial={{ scale: 0.8, y: 0, opacity: 1 }}
            animate={{ scale: 1.6, y: -260, opacity: 0.95 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="fixed inset-x-0 bottom-1/3 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="h-28 w-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.8)] relative flex flex-col items-center">
              <span className="absolute top-3 left-4 h-6 w-3 rounded-full bg-white/40 rotate-[-30deg]" />
              <div className="h-2 w-2 rotate-45 bg-rose-600 -bottom-1 absolute" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-6 max-w-sm mx-auto w-full z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] text-rose-300 font-semibold mb-3">
          <Sparkles size={12} />
          <span>
            QUESTION 0{currentQIndex + 1} / 0{questionsList.length}
          </span>
        </div>

        <motion.h2
          key={activeQuestion.question}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight"
        >
          {activeQuestion.question}
        </motion.h2>
      </div>

      {/* Choice Cards */}
      <div className="my-auto grid grid-cols-1 gap-2.5 max-w-sm mx-auto w-full py-2 z-10">
        {activeQuestion.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          const isWrong = wrongShakeId === opt.id;

          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                x: isWrong ? [0, -8, 8, -6, 6, 0] : 0,
                scale: isSelected ? 1.03 : 1,
              }}
              transition={{ delay: idx * 0.08, x: { duration: 0.4 } }}
              onClick={() => handleSelect(opt)}
              className={`flex items-center justify-between rounded-2xl p-3.5 sm:p-4 text-left border transition-all active:scale-[0.98] cursor-pointer ${
                isSelected
                  ? 'bg-rose-500/25 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                  : isWrong
                  ? 'bg-red-950/40 border-red-500/60 text-red-200'
                  : 'bg-[#151222]/80 border-white/8 text-neutral-200 hover:border-white/20 hover:bg-[#1a162b]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm font-medium">{opt.text}</span>
              </div>
              {isSelected && (
                <Heart size={16} className="text-rose-400 fill-rose-400 animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      <div className="min-h-14 pb-6 flex flex-col items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.p
              key={feedback}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold text-rose-300 italic"
            >
              {feedback}
            </motion.p>
          ) : (
            <MicroHint text="Choose the answer you remember" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
