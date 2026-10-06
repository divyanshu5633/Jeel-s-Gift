import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCheck, Heart, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { sounds } from '../utils/soundEffects';

export const Scene03WhatsAppChat: React.FC = () => {
  const { config, nextScene } = useStory();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDissolving, setIsDissolving] = useState(false);

  useEffect(() => {
    const timeouts: number[] = [];

    config.chat.messages.forEach((msg, idx) => {
      const t = window.setTimeout(() => {
        setIsTyping(true);
        sounds.playTap();
        const displayTimer = window.setTimeout(() => {
          setVisibleCount(idx + 1);
          setIsTyping(idx + 1 < config.chat.messages.length);
        }, 400);
        timeouts.push(displayTimer);
      }, msg.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach((id) => clearTimeout(id));
  }, [config.chat.messages]);

  const handleContinue = () => {
    sounds.playTap();
    setIsDissolving(true);
    setTimeout(() => {
      nextScene();
    }, 750);
  };

  const allVisible = visibleCount >= config.chat.messages.length;

  return (
    <div
      className={`relative flex min-h-dvh flex-col justify-between bg-[#0a0a10] select-none transition-all duration-700 ${
        isDissolving ? '-translate-y-full opacity-0 filter blur-sm' : ''
      }`}
    >
      {/* Chat header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/5 bg-[#12121b]/90 px-4 py-3.5 backdrop-blur-md">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 text-sm font-semibold text-white shadow-md">
            {config.sender[0]}
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#12121b] bg-emerald-500" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-white tracking-wide">{config.sender}</h2>
          <p className="text-[11px] text-emerald-400 font-medium">
            {isTyping ? 'typing...' : 'online'}
          </p>
        </div>
        <Sparkles size={16} className="text-rose-400/60" />
      </div>

      {/* Messages thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col justify-end max-w-lg mx-auto w-full pb-6">
        <div className="text-center my-2">
          <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-[10px] tracking-wider uppercase text-neutral-400">
            End-to-End Private
          </span>
        </div>

        <AnimatePresence>
          {config.chat.messages.slice(0, visibleCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`flex flex-col items-start max-w-[82%] self-start ${
                isDissolving ? 'animate-pulse' : ''
              }`}
            >
              <div className="rounded-2xl rounded-tl-xs bg-[#1a1a28] border border-white/8 px-4 py-3 text-sm text-neutral-100 shadow-md">
                <p className="leading-relaxed">{msg.text}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-neutral-400">
                  <span>just now</span>
                  <CheckCheck size={12} className="text-rose-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Live typing indicator bubble */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 self-start rounded-full bg-[#1a1a28]/80 border border-white/5 px-4 py-2.5 shadow"
          >
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce [animation-delay:0.2s]" />
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce [animation-delay:0.4s]" />
          </motion.div>
        )}
      </div>

      {/* Action button */}
      <div className="p-4 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/90 to-transparent">
        {allVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleContinue}
            className="w-full max-w-sm mx-auto rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-6 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{config.chat.buttonText}</span>
            <Heart size={16} className="fill-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
