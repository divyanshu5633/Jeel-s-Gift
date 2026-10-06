import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [frameMode, setFrameMode] = useState<'mobile' | 'wide'>('mobile');

  return (
    <div className="min-h-dvh w-full bg-[#030306] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Desktop frame mode switcher */}
      <div className="hidden lg:flex fixed bottom-4 right-4 z-50 items-center gap-2 bg-neutral-900/90 border border-white/10 px-3 py-1.5 rounded-full text-xs text-neutral-400 backdrop-blur-md shadow-2xl">
        <span className="text-[10px] tracking-wider uppercase text-neutral-500 font-semibold">Preview:</span>
        <button
          onClick={() => setFrameMode('mobile')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            frameMode === 'mobile'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'hover:text-white'
          }`}
        >
          <Smartphone size={13} />
          <span>Mobile (390px)</span>
        </button>
        <button
          onClick={() => setFrameMode('wide')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            frameMode === 'wide'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'hover:text-white'
          }`}
        >
          <Monitor size={13} />
          <span>Full Window</span>
        </button>
      </div>

      {/* Main container */}
      <div
        className={`w-full transition-all duration-500 relative flex flex-col ${
          frameMode === 'mobile'
            ? 'lg:max-w-[410px] lg:h-[870px] lg:my-auto lg:rounded-[48px] lg:border-[8px] lg:border-[#1e1e24] lg:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(244,63,94,0.1)] lg:overflow-hidden min-h-dvh lg:min-h-0'
            : 'max-w-2xl min-h-dvh'
        }`}
      >
        {/* Fake Dynamic Island for mobile frame on desktop */}
        {frameMode === 'mobile' && (
          <div className="hidden lg:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 border border-white/5 shadow-inner" />
        )}

        <main className="w-full h-full flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
