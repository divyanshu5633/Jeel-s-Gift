import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface MicroHintProps {
  delayMs?: number;
  text?: string;
  className?: string;
}

export const MicroHint: React.FC<MicroHintProps> = ({
  delayMs = 4800,
  text = 'Tap to continue exploring',
  className = '',
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setShow(true);
    }, delayMs);

    const handleUserInteraction = () => {
      setShow(false);
    };

    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [delayMs]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.85, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-wider text-rose-300/80 pointer-events-none select-none py-1.5 ${className}`}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Sparkles size={11} className="text-amber-300" />
          </motion.span>
          <span>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
