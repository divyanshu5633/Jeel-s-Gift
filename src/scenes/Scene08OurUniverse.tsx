import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene08OurUniverse: React.FC = () => {
  const { config, discoverStar, nextScene, goToScene } = useStory();
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

  const handleStarClick = (starId: string) => {
    discoverStar(starId);
    // Expand into Scene 09 Memory Card
    goToScene(9);
  };

  return (
    <div className="relative flex min-h-dvh flex-col justify-between p-6 select-none overflow-hidden bg-radial from-[#0a0818] via-[#04030a] to-black">
      {/* Background Starfield twinkling */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 27) % 100}%`,
              animationDelay: `${(i % 5) * 0.7}s`,
            }}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-ping"
          />
        ))}
      </div>

      {/* Header */}
      <div className="pt-8 text-center max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-indigo-300 font-semibold mb-2"
        >
          <Sparkles size={12} />
          <span>CONSTELLATION</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinzel text-3xl sm:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-300"
        >
          OUR UNIVERSE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-xs sm:text-sm text-neutral-400 italic"
        >
          Every star is a memory. Tap any star to explore.
        </motion.p>
      </div>

      {/* Interactive Constellation Field */}
      <div className="relative my-auto h-[380px] w-full max-w-sm mx-auto z-10">
        {/* Constellation line connectors */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-25">
          <polyline
            points="70,100 130,190 280,75 290,220 230,310 70,290"
            fill="none"
            stroke="rgba(199, 210, 254, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {config.stars.map((star) => {
          const isHovered = hoveredStarId === star.id;

          return (
            <div
              key={star.id}
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onMouseEnter={() => setHoveredStarId(star.id)}
              onMouseLeave={() => setHoveredStarId(null)}
              onClick={() => handleStarClick(star.id)}
            >
              {/* Star Core Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2 + (star.x % 3),
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center p-3"
              >
                <div
                  style={{
                    backgroundColor: star.color,
                    boxShadow: `0 0 18px 4px ${star.color}`,
                  }}
                  className="h-3 w-3 rounded-full transition-transform group-hover:scale-150"
                />
              </motion.div>

              {/* Star Label Popup */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg bg-black/90 border border-indigo-400/30 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl backdrop-blur-md pointer-events-none z-30"
                  >
                    <span className="text-rose-300 font-bold mr-1">✦</span>
                    {star.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom helper button to proceed directly */}
      <div className="pb-6 max-w-xs mx-auto w-full z-10">
        <button
          onClick={nextScene}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-6 py-3.5 text-xs uppercase tracking-widest text-neutral-300 transition-all active:scale-95 backdrop-blur-md"
        >
          <span>EXPLORE MEMORIES</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
