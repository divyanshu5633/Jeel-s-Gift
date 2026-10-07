import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCheck, Heart } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { sounds } from '../../utils/soundEffects';

export const Scene02WhatsAppChat: React.FC = () => {
  const { config, nextScene } = useStory();
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [isFloatingUp, setIsFloatingUp] = useState(false);

  useEffect(() => {
    // Deliver messages with comfortable, gentle pacing
    const delays = [800, 2000, 3200, 4400];
    const timeouts: number[] = [];

    delays.forEach((delay, idx) => {
      const t = window.setTimeout(() => {
        setIsTyping(true);
        sounds.playTap();
        const msgTimer = window.setTimeout(() => {
          setVisibleCount(idx + 2);
          setIsTyping(idx + 2 < config.chat.messages.length);
        }, 250);
        timeouts.push(msgTimer);
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach((id) => clearTimeout(id));
  }, [config.chat.messages.length]);

  const handleFastForward = () => {
    // Tapping chat speeds up all messages immediately so nobody is ever stuck
    if (visibleCount < config.chat.messages.length) {
      sounds.playTap();
      setVisibleCount(config.chat.messages.length);
      setIsTyping(false);
    }
  };

  const handleProveIt = () => {
    sounds.playTap();
    setIsFloatingUp(true);
    setTimeout(() => {
      nextScene();
    }, 600);
  };

  return (
    <div
      onClick={handleFastForward}
      className={`relative flex min-h-dvh flex-col justify-between bg-[#08070d] p-4 select-none transition-all duration-700 cursor-pointer ${
        isFloatingUp ? '-translate-y-24 opacity-0 filter blur-xs' : ''
      }`}
    >
      {/* Sender Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border border-white/8 bg-[#0f0e17]/90 px-4 py-3 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-sm font-bold text-white shadow">
              {config.sender[0]}
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0f0e17] bg-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">{config.sender}</h3>
            <p className="text-[10px] text-emerald-400 font-medium">
              {isTyping ? 'typing...' : 'online now'}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProveIt();
          }}
          className="text-[11px] text-rose-300 hover:text-white px-2 py-1 rounded-md bg-white/5 active:scale-95"
        >
          Skip to game →
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto py-6 space-y-3.5 flex flex-col justify-end max-w-sm mx-auto w-full">
        <AnimatePresence>
          {config.chat.messages.slice(0, visibleCount).map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-start max-w-[85%] self-start"
            >
              <div className="rounded-2xl rounded-tl-xs bg-[#171524] border border-white/8 px-4 py-3 text-sm text-neutral-100 shadow-md">
                <p className="leading-relaxed">{text}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-neutral-500">
                  <span>just now</span>
                  <CheckCheck size={12} className="text-rose-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 self-start rounded-full bg-[#171524]/80 border border-white/5 px-3.5 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce [animation-delay:0.2s]" />
            <span className="h-2 w-2 rounded-full bg-rose-400/80 animate-bounce [animation-delay:0.4s]" />
          </motion.div>
        )}
      </div>

      {/* Unmissable Proceed Action Button */}
      <div className="pb-4 max-w-sm mx-auto w-full flex flex-col items-center gap-2">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            handleProveIt();
          }}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{config.chat.buttonText}</span>
          <Heart size={16} className="fill-white" />
        </motion.button>
      </div>
    </div>
  );
};
